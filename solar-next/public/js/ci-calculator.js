/**
 * Commercial & Industrial Solar Calculator - Frontend JavaScript
 * 
 * Handles user input, API calls, and results display for the C&I solar calculator.
 * Supports CAPEX and OPEX models with detailed financial analysis.
 */

(function() {
  'use strict';

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const state = {
    ownershipModel: 'capex',
    customerSegment: 'industrial',
    installationType: 'rooftop',
    city: '',
    pincode: '',
    monthlyConsumption: 50000,
    monthlyBill: null,
    avgTariff: null,
    inputMode: 'kwh', // 'kwh' or 'bill'
    
    // Advanced settings
    availableArea: null,
    operatingDays: 300,
    captivePercent: 80,
    netMeteringPercent: 20,
    tariffEscalation: 4,
    discountRate: 10,
    customEpcCost: null,
    customOmPercent: 1,
    ppaTariff: 4.5,
    ppaEscalation: 3,
    
    // Results
    calculation: null,
    loading: false,
  };

  // Regional default tariffs (backup)
  const regionalTariffs = {
    industrial: { default: 8.0, Mumbai: 10.0, Delhi: 9.0, Bangalore: 7.8, Chennai: 7.0 },
    commercial: { default: 9.5, Mumbai: 12.0, Delhi: 10.5, Bangalore: 9.0, Chennai: 8.0 },
  };

  // ============================================================================
  // DOM ELEMENTS
  // ============================================================================

  const elements = {
    form: document.getElementById('ciCalculatorForm'),
    calculateBtn: document.getElementById('calculateBtn'),
    resultsSection: document.getElementById('resultsSection'),
    resultsContent: document.getElementById('resultsContent'),
    
    // Tabs
    tabCapex: document.getElementById('tabCapex'),
    tabOpex: document.getElementById('tabOpex'),
    ppaOptions: document.getElementById('ppaOptions'),
    capexAdvanced: document.getElementById('capexAdvanced'),
    
    // Inputs
    cityInput: document.getElementById('cityInput'),
    pincodeInput: document.getElementById('pincodeInput'),
    monthlyConsumption: document.getElementById('monthlyConsumption'),
    consumptionSlider: document.getElementById('consumptionSlider'),
    monthlyBill: document.getElementById('monthlyBill'),
    billSlider: document.getElementById('billSlider'),
    avgTariff: document.getElementById('avgTariff'),
    availableArea: document.getElementById('availableArea'),
    operatingDays: document.getElementById('operatingDays'),
    captivePercent: document.getElementById('captivePercent'),
    netMeteringPercent: document.getElementById('netMeteringPercent'),
    tariffEscalation: document.getElementById('tariffEscalation'),
    discountRate: document.getElementById('discountRate'),
    customEpcCost: document.getElementById('customEpcCost'),
    customOmPercent: document.getElementById('customOmPercent'),
    ppaTariff: document.getElementById('ppaTariff'),
    ppaEscalation: document.getElementById('ppaEscalation'),
    
    // Input mode elements
    inputKwh: document.getElementById('inputKwh'),
    inputBill: document.getElementById('inputBill'),
    btnInputKwh: document.getElementById('btnInputKwh'),
    btnInputBill: document.getElementById('btnInputBill'),
    
    // Preview elements
    previewCapacity: document.getElementById('previewCapacity'),
    previewGeneration: document.getElementById('previewGeneration'),
    previewInvestment: document.getElementById('previewInvestment'),
    previewSavings: document.getElementById('previewSavings'),
    
    // Advanced settings
    advancedSettings: document.getElementById('advancedSettings'),
    advancedIcon: document.getElementById('advancedIcon'),
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    if (!elements.form) return;
    
    setupEventListeners();
    updateQuickPreview();
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  function setupEventListeners() {
    // Form submission
    elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await performCalculation();
    });

    // Customer segment
    document.querySelectorAll('input[name="customerSegment"]').forEach(input => {
      input.addEventListener('change', (e) => {
        state.customerSegment = e.target.value;
        updateQuickPreview();
      });
    });

    // Installation type
    document.querySelectorAll('input[name="installationType"]').forEach(input => {
      input.addEventListener('change', (e) => {
        state.installationType = e.target.value;
        updateQuickPreview();
      });
    });

    // City selection
    if (elements.cityInput) {
      elements.cityInput.addEventListener('change', (e) => {
        state.city = e.target.value;
        updateTariffHint();
        updateQuickPreview();
      });
    }

    // Pincode
    if (elements.pincodeInput) {
      elements.pincodeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 6);
        e.target.value = value;
        state.pincode = value;
      });
    }

    // Consumption input and slider sync
    if (elements.monthlyConsumption && elements.consumptionSlider) {
      elements.consumptionSlider.addEventListener('input', (e) => {
        state.monthlyConsumption = parseInt(e.target.value);
        elements.monthlyConsumption.value = state.monthlyConsumption;
        updateQuickPreview();
      });

      elements.monthlyConsumption.addEventListener('input', (e) => {
        state.monthlyConsumption = parseInt(e.target.value) || 1000;
        elements.consumptionSlider.value = Math.min(state.monthlyConsumption, 500000);
        updateQuickPreview();
      });
    }

    // Bill input and slider sync
    if (elements.monthlyBill && elements.billSlider) {
      elements.billSlider.addEventListener('input', (e) => {
        state.monthlyBill = parseInt(e.target.value);
        elements.monthlyBill.value = state.monthlyBill;
        updateQuickPreview();
      });

      elements.monthlyBill.addEventListener('input', (e) => {
        state.monthlyBill = parseInt(e.target.value) || 10000;
        elements.billSlider.value = Math.min(state.monthlyBill, 5000000);
        updateQuickPreview();
      });
    }

    // Tariff input
    if (elements.avgTariff) {
      elements.avgTariff.addEventListener('input', (e) => {
        state.avgTariff = parseFloat(e.target.value) || null;
        updateQuickPreview();
      });
    }

    // Advanced inputs
    ['availableArea', 'operatingDays', 'captivePercent', 'netMeteringPercent', 
     'tariffEscalation', 'discountRate', 'customEpcCost', 'customOmPercent',
     'ppaTariff', 'ppaEscalation'].forEach(id => {
      const el = elements[id];
      if (el) {
        el.addEventListener('input', (e) => {
          state[id] = parseFloat(e.target.value) || null;
          if (id === 'customEpcCost' || id === 'captivePercent') {
            updateQuickPreview();
          }
        });
      }
    });

    // Lead form
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
      leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitLead();
      });
    }
  }

  // ============================================================================
  // UI FUNCTIONS
  // ============================================================================

  // Switch between CAPEX and OPEX models
  window.switchOwnershipModel = function(model) {
    state.ownershipModel = model;
    
    // Update tabs
    if (model === 'capex') {
      elements.tabCapex.classList.add('tab-active');
      elements.tabOpex.classList.remove('tab-active');
      elements.tabOpex.classList.add('text-gray-500');
      elements.tabCapex.classList.remove('text-gray-500');
      elements.ppaOptions.classList.add('hidden');
      elements.capexAdvanced.classList.remove('hidden');
    } else {
      elements.tabOpex.classList.add('tab-active');
      elements.tabCapex.classList.remove('tab-active');
      elements.tabCapex.classList.add('text-gray-500');
      elements.tabOpex.classList.remove('text-gray-500');
      elements.ppaOptions.classList.remove('hidden');
      elements.capexAdvanced.classList.add('hidden');
    }
    
    updateQuickPreview();
  };

  // Toggle consumption input mode
  window.toggleConsumptionInput = function(mode) {
    state.inputMode = mode;
    
    if (mode === 'kwh') {
      elements.inputKwh.classList.remove('hidden');
      elements.inputBill.classList.add('hidden');
      elements.btnInputKwh.classList.add('bg-white', 'shadow', 'text-primary');
      elements.btnInputKwh.classList.remove('text-gray-500');
      elements.btnInputBill.classList.remove('bg-white', 'shadow', 'text-primary');
      elements.btnInputBill.classList.add('text-gray-500');
    } else {
      elements.inputBill.classList.remove('hidden');
      elements.inputKwh.classList.add('hidden');
      elements.btnInputBill.classList.add('bg-white', 'shadow', 'text-primary');
      elements.btnInputBill.classList.remove('text-gray-500');
      elements.btnInputKwh.classList.remove('bg-white', 'shadow', 'text-primary');
      elements.btnInputKwh.classList.add('text-gray-500');
    }
  };

  // Toggle advanced settings
  window.toggleAdvancedSettings = function() {
    const isHidden = elements.advancedSettings.classList.contains('hidden');
    elements.advancedSettings.classList.toggle('hidden');
    elements.advancedIcon.textContent = isHidden ? 'expand_less' : 'expand_more';
  };

  // Use regional default tariff
  window.useRegionalTariff = function() {
    elements.avgTariff.value = '';
    state.avgTariff = null;
    updateTariffHint();
  };

  // Update tariff hint
  function updateTariffHint() {
    const hint = document.getElementById('tariffHint');
    if (hint && state.city) {
      const segment = state.customerSegment;
      const tariff = regionalTariffs[segment][state.city] || regionalTariffs[segment].default;
      hint.textContent = `Default for ${state.city} (${segment}): ₹${tariff}/kWh`;
    }
  }

  // Quick preview calculation (client-side estimate)
  function updateQuickPreview() {
    const consumption = state.inputMode === 'kwh' 
      ? state.monthlyConsumption 
      : (state.monthlyBill || 400000) / (state.avgTariff || 8);
    
    const annualConsumption = consumption * 12;
    const peakSunHours = 4.8; // Average
    const pr = 0.78;
    
    // Estimate capacity
    const capacity = Math.round(annualConsumption / (peakSunHours * 365 * pr));
    
    // Estimate generation
    const generation = Math.round(capacity * peakSunHours * 365 * pr * 0.98);
    
    // Estimate investment
    const epcCost = state.customEpcCost || (state.installationType === 'rooftop' ? 48000 : 52000);
    const investment = capacity * epcCost;
    
    // Estimate savings
    const tariff = state.avgTariff || regionalTariffs[state.customerSegment].default;
    let savings;
    if (state.ownershipModel === 'capex') {
      const omCost = investment * 0.01;
      savings = (generation * tariff) - omCost;
    } else {
      savings = generation * (tariff - state.ppaTariff);
    }
    
    // Update preview
    if (elements.previewCapacity) {
      elements.previewCapacity.textContent = capacity >= 1000 
        ? `${(capacity / 1000).toFixed(1)} MW` 
        : `${capacity} kW`;
    }
    if (elements.previewGeneration) {
      elements.previewGeneration.textContent = generation >= 1000000 
        ? `${(generation / 1000000).toFixed(2)}M kWh`
        : `${(generation / 1000).toFixed(0)}K kWh`;
    }
    if (elements.previewInvestment) {
      if (state.ownershipModel === 'capex') {
        elements.previewInvestment.textContent = investment >= 10000000
          ? `₹${(investment / 10000000).toFixed(2)} Cr`
          : `₹${(investment / 100000).toFixed(1)} L`;
      } else {
        elements.previewInvestment.textContent = '₹0 (OPEX)';
      }
    }
    if (elements.previewSavings) {
      elements.previewSavings.textContent = savings >= 1000000
        ? `₹${(savings / 100000).toFixed(1)} L/yr`
        : `₹${(savings / 1000).toFixed(0)}K/yr`;
    }
  }

  // ============================================================================
  // API CALLS
  // ============================================================================

  async function performCalculation() {
    // Validation
    if (!state.city && !state.pincode) {
      alert('Please select a city or enter a pincode');
      return;
    }

    const consumption = state.inputMode === 'kwh' ? state.monthlyConsumption : null;
    const bill = state.inputMode === 'bill' ? state.monthlyBill : null;

    if (!consumption && !bill) {
      alert('Please enter monthly consumption or bill amount');
      return;
    }

    state.loading = true;
    showLoadingState();

    try {
      const payload = {
        city: state.city,
        pincode: state.pincode,
        monthlyConsumption: consumption,
        monthlyBill: bill,
        avgTariff: state.avgTariff,
        customerSegment: state.customerSegment,
        installationType: state.installationType,
        ownershipModel: state.ownershipModel,
        availableArea: state.availableArea,
        operatingDays: state.operatingDays,
        captiveConsumptionPercent: state.captivePercent,
        netMeteringPercent: state.netMeteringPercent,
        tariffEscalation: state.tariffEscalation,
        discountRate: state.discountRate,
        customEpcCost: state.customEpcCost,
        customOmPercent: state.customOmPercent ? state.customOmPercent / 100 : null,
        ppaTariff: state.ppaTariff,
        ppaEscalation: state.ppaEscalation,
      };

      const response = await fetch('/api/ci-calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.calculation) {
        state.calculation = data.calculation;
        displayResults(data.calculation);
        scrollToResults();
      } else {
        alert(data.error || 'Calculation failed. Please check your inputs.');
      }
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Failed to calculate. Please try again.');
    } finally {
      state.loading = false;
      hideLoadingState();
    }
  }

  function showLoadingState() {
    if (elements.calculateBtn) {
      elements.calculateBtn.disabled = true;
      elements.calculateBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Calculating...</span>
      `;
    }
  }

  function hideLoadingState() {
    if (elements.calculateBtn) {
      elements.calculateBtn.disabled = false;
      elements.calculateBtn.innerHTML = `
        <span class="material-symbols-outlined">calculate</span>
        Calculate Solar Savings
      `;
    }
  }

  // ============================================================================
  // RESULTS DISPLAY
  // ============================================================================

  function displayResults(calc) {
    if (!elements.resultsContent) return;

    const isCapex = calc.input.ownershipModel === 'capex';
    
    const html = `
      <div class="fade-in">
        <!-- Results Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <span class="material-symbols-outlined">check_circle</span>
            <span class="font-semibold">Calculation Complete</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your C&I Solar Analysis
          </h2>
          <p class="text-lg text-gray-600">
            ${calc.system.finalCapacity >= 1000 ? (calc.system.finalCapacity/1000).toFixed(1) + ' MW' : calc.system.finalCapacity + ' kW'} 
            ${calc.input.installationType === 'rooftop' ? 'Rooftop' : 'Ground-mounted'} System | 
            ${isCapex ? 'CAPEX Model' : 'OPEX/PPA Model'} | 
            ${calc.input.region}
          </p>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          ${isCapex ? `
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">Total Investment</div>
            <div class="text-3xl font-black">₹${formatCurrency(calc.capex.totalInvestment)}</div>
            <div class="text-xs opacity-70 mt-1">₹${(calc.capex.epcCostPerKw/1000).toFixed(0)}K/kW</div>
          </div>
          <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">Simple Payback</div>
            <div class="text-3xl font-black">${calc.capex.simplePaybackYears} Years</div>
            <div class="text-xs opacity-70 mt-1">Break-even period</div>
          </div>
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">IRR</div>
            <div class="text-3xl font-black">${calc.capex.irr}%</div>
            <div class="text-xs opacity-70 mt-1">Internal Rate of Return</div>
          </div>
          <div class="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">25-Year Savings</div>
            <div class="text-3xl font-black">₹${formatCurrency(calc.savings.lifetimeSavings)}</div>
            <div class="text-xs opacity-70 mt-1">Net cashflow</div>
          </div>
          ` : `
          <div class="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">PPA Tariff</div>
            <div class="text-3xl font-black">₹${calc.opex.ppaTariff}/kWh</div>
            <div class="text-xs opacity-70 mt-1">${calc.opex.ppaEscalation}% annual escalation</div>
          </div>
          <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">Day 1 Savings</div>
            <div class="text-3xl font-black">${calc.opex.avgSavingsPercent}%</div>
            <div class="text-xs opacity-70 mt-1">vs Grid tariff</div>
          </div>
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">Year 1 Savings</div>
            <div class="text-3xl font-black">₹${formatCurrency(calc.opex.firstYearSavings)}</div>
            <div class="text-xs opacity-70 mt-1">No upfront cost</div>
          </div>
          <div class="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-5 rounded-xl shadow-lg">
            <div class="text-sm opacity-80 mb-1">25-Year Savings</div>
            <div class="text-3xl font-black">₹${formatCurrency(calc.opex.lifetimeSavings)}</div>
            <div class="text-xs opacity-70 mt-1">Total savings</div>
          </div>
          `}
        </div>

        <!-- Detailed Results Tabs -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div class="border-b border-gray-200">
            <div class="flex overflow-x-auto">
              <button onclick="showResultTab('system')" id="tabSystem" class="px-6 py-4 font-medium text-sm whitespace-nowrap tab-active">
                System Specs
              </button>
              <button onclick="showResultTab('financial')" id="tabFinancial" class="px-6 py-4 font-medium text-sm whitespace-nowrap text-gray-500">
                Financial Analysis
              </button>
              <button onclick="showResultTab('cashflow')" id="tabCashflow" class="px-6 py-4 font-medium text-sm whitespace-nowrap text-gray-500">
                25-Year Cashflow
              </button>
              <button onclick="showResultTab('environmental')" id="tabEnvironmental" class="px-6 py-4 font-medium text-sm whitespace-nowrap text-gray-500">
                Environmental
              </button>
            </div>
          </div>

          <!-- System Specs Tab -->
          <div id="contentSystem" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Recommended Capacity</div>
                <div class="text-2xl font-bold">${calc.system.finalCapacity >= 1000 ? (calc.system.finalCapacity/1000).toFixed(2) + ' MW' : calc.system.finalCapacity + ' kW'}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Annual Generation (Year 1)</div>
                <div class="text-2xl font-bold">${(calc.system.annualGeneration/1000).toLocaleString()} MWh</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Specific Yield</div>
                <div class="text-2xl font-bold">${calc.system.specificYield} kWh/kWp</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Capacity Utilization (CUF)</div>
                <div class="text-2xl font-bold">${calc.system.capacityUtilizationFactor}%</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Area Required</div>
                <div class="text-2xl font-bold">${calc.system.areaRequired.toLocaleString()} sq.ft</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Performance Ratio</div>
                <div class="text-2xl font-bold">${(calc.system.performanceRatio * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          <!-- Financial Tab -->
          <div id="contentFinancial" class="p-6 hidden">
            ${isCapex ? `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold mb-4">Investment Breakdown</h4>
                <div class="space-y-3">
                  <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-600">Total CAPEX</span>
                    <span class="font-bold">₹${formatCurrency(calc.capex.totalInvestment)}</span>
                  </div>
                  <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-600">Annual O&M (Year 1)</span>
                    <span class="font-bold">₹${formatCurrency(calc.capex.annualOmCost)}</span>
                  </div>
                  <div class="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span class="text-gray-600">LCOE</span>
                    <span class="font-bold text-blue-600">₹${calc.capex.lcoe}/kWh</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-4">Returns</h4>
                <div class="space-y-3">
                  <div class="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span class="text-gray-600">NPV (${(state.discountRate || 10)}% discount)</span>
                    <span class="font-bold text-green-600">₹${formatCurrency(calc.capex.npv)}</span>
                  </div>
                  <div class="flex justify-between p-3 bg-purple-50 rounded-lg">
                    <span class="text-gray-600">IRR</span>
                    <span class="font-bold text-purple-600">${calc.capex.irr}%</span>
                  </div>
                  <div class="flex justify-between p-3 bg-amber-50 rounded-lg">
                    <span class="text-gray-600">25-Year ROI</span>
                    <span class="font-bold text-amber-600">${calc.capex.roi25Year}%</span>
                  </div>
                </div>
              </div>
            </div>
            ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold mb-4">PPA Terms</h4>
                <div class="space-y-3">
                  <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-600">PPA Tariff</span>
                    <span class="font-bold">₹${calc.opex.ppaTariff}/kWh</span>
                  </div>
                  <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-600">Grid Tariff</span>
                    <span class="font-bold">₹${calc.input.avgTariff}/kWh</span>
                  </div>
                  <div class="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span class="text-gray-600">Savings per Unit</span>
                    <span class="font-bold text-green-600">₹${(calc.input.avgTariff - calc.opex.ppaTariff).toFixed(2)}/kWh</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-4">Savings Summary</h4>
                <div class="space-y-3">
                  <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-600">Year 1 Savings</span>
                    <span class="font-bold">₹${formatCurrency(calc.opex.firstYearSavings)}</span>
                  </div>
                  <div class="flex justify-between p-3 bg-amber-50 rounded-lg">
                    <span class="text-gray-600">25-Year Savings</span>
                    <span class="font-bold text-amber-600">₹${formatCurrency(calc.opex.lifetimeSavings)}</span>
                  </div>
                </div>
              </div>
            </div>
            `}
            
            <!-- Savings Milestones -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="font-semibold mb-4">Savings Milestones</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">₹${formatCurrency(calc.savings.firstYearSavings)}</div>
                  <div class="text-sm text-gray-500">Year 1</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">₹${formatCurrency(calc.savings.year5CumulativeSavings)}</div>
                  <div class="text-sm text-gray-500">Year 5 (Cumulative)</div>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">₹${formatCurrency(calc.savings.year10CumulativeSavings)}</div>
                  <div class="text-sm text-gray-500">Year 10 (Cumulative)</div>
                </div>
                <div class="text-center p-4 bg-green-100 rounded-lg">
                  <div class="text-2xl font-bold text-green-700">₹${formatCurrency(calc.savings.lifetimeSavings)}</div>
                  <div class="text-sm text-gray-600">25-Year Total</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cashflow Tab -->
          <div id="contentCashflow" class="p-6 hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="px-4 py-3 text-left font-semibold">Year</th>
                    <th class="px-4 py-3 text-right font-semibold">Generation (kWh)</th>
                    <th class="px-4 py-3 text-right font-semibold">Tariff (₹/kWh)</th>
                    <th class="px-4 py-3 text-right font-semibold">Gross Savings</th>
                    ${isCapex ? '<th class="px-4 py-3 text-right font-semibold">O&M Cost</th>' : ''}
                    <th class="px-4 py-3 text-right font-semibold">Net Savings</th>
                    <th class="px-4 py-3 text-right font-semibold">Cumulative</th>
                    <th class="px-4 py-3 text-right font-semibold">CO₂ Avoided</th>
                  </tr>
                </thead>
                <tbody>
                  ${calc.cashflow.map((cf, i) => `
                    <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${cf.cumulativeCashflow >= 0 && calc.cashflow[i-1]?.cumulativeCashflow < 0 ? 'border-l-4 border-green-500' : ''}">
                      <td class="px-4 py-2 font-medium">${cf.year}</td>
                      <td class="px-4 py-2 text-right">${cf.generation.toLocaleString()}</td>
                      <td class="px-4 py-2 text-right">₹${cf.tariffRate}</td>
                      <td class="px-4 py-2 text-right">₹${formatCurrency(cf.grossSavings)}</td>
                      ${isCapex ? `<td class="px-4 py-2 text-right text-red-600">-₹${formatCurrency(cf.omCost)}</td>` : ''}
                      <td class="px-4 py-2 text-right text-green-600 font-medium">₹${formatCurrency(cf.netSavings)}</td>
                      <td class="px-4 py-2 text-right ${cf.cumulativeCashflow >= 0 ? 'text-green-600' : 'text-red-600'} font-medium">
                        ${cf.cumulativeCashflow >= 0 ? '₹' : '-₹'}${formatCurrency(Math.abs(cf.cumulativeCashflow))}
                      </td>
                      <td class="px-4 py-2 text-right">${cf.co2Avoided} t</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            ${isCapex ? `<p class="text-sm text-gray-500 mt-4">* Green border indicates payback year (cumulative cashflow turns positive)</p>` : ''}
          </div>

          <!-- Environmental Tab -->
          <div id="contentEnvironmental" class="p-6 hidden">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-5xl mb-3">☁️</div>
                <div class="text-3xl font-bold text-green-700">${calc.environmental.annualCo2Avoided} t</div>
                <div class="text-sm text-gray-600">CO₂ Avoided/Year</div>
              </div>
              <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-5xl mb-3">🌍</div>
                <div class="text-3xl font-bold text-green-700">${calc.environmental.lifetimeCo2Avoided.toLocaleString()} t</div>
                <div class="text-sm text-gray-600">Lifetime CO₂ Avoided</div>
              </div>
              <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-5xl mb-3">🌳</div>
                <div class="text-3xl font-bold text-green-700">${calc.environmental.treesEquivalent.toLocaleString()}</div>
                <div class="text-sm text-gray-600">Trees Planted Equivalent</div>
              </div>
              <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-5xl mb-3">🚗</div>
                <div class="text-3xl font-bold text-green-700">${calc.environmental.carsOffRoad.toLocaleString()}</div>
                <div class="text-sm text-gray-600">Cars Off Road/Year</div>
              </div>
            </div>
            
            <div class="mt-8 bg-emerald-800 text-white p-6 rounded-xl">
              <h4 class="font-semibold text-lg mb-3">Your Environmental Impact</h4>
              <p class="text-emerald-100">
                By installing this ${calc.system.finalCapacity}kW solar system, your organization will offset 
                <strong>${calc.environmental.lifetimeCo2Avoided.toLocaleString()} tonnes of CO₂</strong> over 25 years. 
                This is equivalent to planting <strong>${calc.environmental.treesEquivalent.toLocaleString()} trees</strong> 
                or taking <strong>${calc.environmental.carsOffRoad} cars off the road annually</strong>.
              </p>
            </div>
          </div>
        </div>

        <!-- Assumptions Used -->
        <div class="bg-slate-100 rounded-xl p-6 mb-8">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">info</span>
            Assumptions Used in This Calculation
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            ${calc.metadata.assumptions.map(a => `<li class="flex items-start gap-2"><span class="text-primary">•</span> ${a}</li>`).join('')}
          </ul>
          ${calc.metadata.warnings.length > 0 ? `
            <div class="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
              <ul class="text-sm text-yellow-700 space-y-1">
                ${calc.metadata.warnings.map(w => `<li>${w}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button onclick="openLeadModal()" class="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">description</span>
            Get Detailed Proposal
          </button>
          <button onclick="window.print()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">print</span>
            Print Report
          </button>
          <button onclick="recalculate()" class="border-2 border-primary text-primary hover:bg-blue-50 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2">
            <span class="material-symbols-outlined">refresh</span>
            Recalculate
          </button>
        </div>
      </div>
    `;

    elements.resultsContent.innerHTML = html;
    elements.resultsSection.classList.remove('hidden');
  }

  // Tab switching for results
  window.showResultTab = function(tab) {
    const tabs = ['system', 'financial', 'cashflow', 'environmental'];
    tabs.forEach(t => {
      document.getElementById(`tab${capitalize(t)}`).classList.remove('tab-active');
      document.getElementById(`tab${capitalize(t)}`).classList.add('text-gray-500');
      document.getElementById(`content${capitalize(t)}`).classList.add('hidden');
    });
    document.getElementById(`tab${capitalize(tab)}`).classList.add('tab-active');
    document.getElementById(`tab${capitalize(tab)}`).classList.remove('text-gray-500');
    document.getElementById(`content${capitalize(tab)}`).classList.remove('hidden');
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatCurrency(num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  }

  function scrollToResults() {
    if (elements.resultsSection) {
      elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  window.recalculate = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    elements.resultsSection.classList.add('hidden');
  };

  // ============================================================================
  // LEAD CAPTURE
  // ============================================================================

  window.openLeadModal = function() {
    document.getElementById('leadModal').classList.remove('hidden');
  };

  window.closeLeadModal = function() {
    document.getElementById('leadModal').classList.add('hidden');
  };

  async function submitLead() {
    const name = document.getElementById('leadName').value;
    const company = document.getElementById('leadCompany').value;
    const phone = document.getElementById('leadPhone').value;
    const email = document.getElementById('leadEmail').value;
    const message = document.getElementById('leadMessage').value;

    if (!name || !phone || !email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        ...state,
        saveLead: true,
        name,
        companyName: company,
        phone,
        email,
        message,
      };

      const response = await fetch('/api/ci-calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you! Our C&I solar team will contact you within 24 hours with a detailed proposal.');
        closeLeadModal();
        document.getElementById('leadForm').reset();
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Failed to submit. Please try again.');
    }
  }

  // ============================================================================
  // INITIALIZE
  // ============================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
