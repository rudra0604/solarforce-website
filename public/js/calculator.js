/**
 * SolarForce Solar Calculator
 * Converted from React component to vanilla JavaScript
 * Features: Pincode validation, tabbed results, EMI calculator, environmental impact
 */

(function () {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const state = {
    pincode: '',
    location: '',
    electricityBill: '',
    showResults: false,
    activeTab: 'system',
    emiTenure: 60,

    // Calculated values
    systemSize: 0,
    roofArea: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    fiveYearSavings: 0,
    totalCost: 0,
    subsidy: 0,
    netCost: 0,
    emi: 0,
    downPayment: 0,
    netDownPayment: 0,
    co2Mitigated: 0,
    treesPlanted: 0,
    distanceKm: 0,
  };

  // ============================================
  // PINCODE DATABASE
  // ============================================
  const pincodeDatabase = {
    // Delhi
    '110001': 'New Delhi', '110002': 'New Delhi', '110003': 'New Delhi', '110004': 'New Delhi',
    '110005': 'New Delhi', '110006': 'New Delhi', '110007': 'New Delhi', '110008': 'New Delhi',
    '110009': 'New Delhi', '110010': 'New Delhi', '110011': 'New Delhi', '110012': 'New Delhi',
    '110013': 'New Delhi', '110014': 'New Delhi', '110015': 'New Delhi', '110016': 'New Delhi',
    '110017': 'New Delhi', '110018': 'New Delhi', '110019': 'New Delhi', '110020': 'New Delhi',
    '110021': 'New Delhi', '110022': 'New Delhi', '110023': 'New Delhi', '110024': 'New Delhi',
    '110025': 'New Delhi', '110026': 'New Delhi', '110027': 'New Delhi', '110028': 'New Delhi',
    '110029': 'New Delhi', '110030': 'New Delhi', '110031': 'New Delhi', '110032': 'New Delhi',
    '110033': 'New Delhi', '110034': 'New Delhi', '110035': 'New Delhi', '110036': 'New Delhi',
    '110037': 'New Delhi', '110038': 'New Delhi', '110039': 'New Delhi', '110040': 'New Delhi',
    '110041': 'New Delhi', '110042': 'New Delhi', '110043': 'New Delhi', '110044': 'New Delhi',
    '110045': 'New Delhi', '110046': 'New Delhi', '110047': 'New Delhi', '110048': 'New Delhi',
    '110049': 'New Delhi', '110051': 'New Delhi', '110052': 'New Delhi', '110053': 'New Delhi',
    '110054': 'New Delhi', '110055': 'New Delhi', '110056': 'New Delhi', '110057': 'New Delhi',
    '110058': 'New Delhi', '110059': 'New Delhi', '110060': 'New Delhi', '110061': 'New Delhi',
    '110062': 'New Delhi', '110063': 'New Delhi', '110064': 'New Delhi', '110065': 'New Delhi',
    '110066': 'New Delhi', '110067': 'New Delhi', '110068': 'New Delhi', '110069': 'New Delhi',
    '110070': 'New Delhi', '110071': 'New Delhi', '110072': 'New Delhi', '110073': 'New Delhi',
    '110074': 'New Delhi', '110075': 'New Delhi', '110076': 'New Delhi', '110077': 'New Delhi',
    '110078': 'New Delhi', '110080': 'New Delhi', '110081': 'New Delhi', '110082': 'New Delhi',
    '110083': 'New Delhi', '110084': 'New Delhi', '110085': 'New Delhi', '110086': 'New Delhi',
    '110087': 'New Delhi', '110088': 'New Delhi', '110089': 'New Delhi', '110091': 'New Delhi',
    '110092': 'New Delhi', '110093': 'New Delhi', '110094': 'New Delhi', '110095': 'New Delhi',
    '110096': 'New Delhi',
    // Gurugram
    '122001': 'Gurugram', '122002': 'Gurugram', '122003': 'Gurugram', '122004': 'Gurugram',
    '122005': 'Gurugram', '122006': 'Gurugram', '122007': 'Gurugram', '122008': 'Gurugram',
    '122009': 'Gurugram', '122010': 'Gurugram', '122011': 'Gurugram', '122015': 'Gurugram',
    '122016': 'Gurugram', '122017': 'Gurugram', '122018': 'Gurugram', '122022': 'Gurugram',
    // Noida
    '201301': 'Noida', '201302': 'Noida', '201303': 'Noida', '201304': 'Noida', '201305': 'Noida',
    '201306': 'Noida', '201307': 'Noida', '201308': 'Noida', '201309': 'Noida', '201310': 'Noida',
    // Indore
    '452001': 'Indore', '452002': 'Indore', '452003': 'Indore', '452004': 'Indore',
    '452005': 'Indore', '452006': 'Indore', '452007': 'Indore', '452008': 'Indore',
    '452009': 'Indore', '452010': 'Indore', '452011': 'Indore', '452012': 'Indore',
    // Gwalior
    '474001': 'Gwalior', '474002': 'Gwalior', '474003': 'Gwalior', '474004': 'Gwalior',
    '474005': 'Gwalior', '474006': 'Gwalior', '474007': 'Gwalior', '474008': 'Gwalior',
    '474009': 'Gwalior', '474010': 'Gwalior', '474011': 'Gwalior',
    // Bhind
    '477001': 'Bhind', '477111': 'Bhind', '477222': 'Bhind', '477333': 'Bhind',
    '477444': 'Bhind', '477555': 'Bhind', '477666': 'Bhind', '477777': 'Bhind',
    // Bhopal
    '462001': 'Bhopal', '462002': 'Bhopal', '462003': 'Bhopal', '462004': 'Bhopal',
    '462005': 'Bhopal', '462006': 'Bhopal', '462007': 'Bhopal', '462008': 'Bhopal',
    '462010': 'Bhopal', '462011': 'Bhopal', '462016': 'Bhopal', '462020': 'Bhopal',
    '462021': 'Bhopal', '462022': 'Bhopal', '462023': 'Bhopal', '462024': 'Bhopal',
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const elements = {
    form: document.getElementById('calculatorForm'),
    pincodeInput: document.getElementById('pincodeInput'),
    billInput: document.getElementById('billInput'),
    calculateBtn: document.getElementById('calculateBtn'),
    resultsSection: document.getElementById('resultsSection'),
    locationSuccess: document.getElementById('locationSuccess'),
    locationError: document.getElementById('locationError'),
    locationText: document.getElementById('locationText'),
    emiTenureSlider: document.getElementById('emiTenureSlider'),
    emiTenureDisplay: document.getElementById('emiTenureDisplay'),
    quoteForm: document.getElementById('quoteForm'),
    quoteModal: document.getElementById('getQuoteModal'),
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    if (!elements.form) return;
    setupEventListeners();
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  function setupEventListeners() {
    // Pincode input
    if (elements.pincodeInput) {
      elements.pincodeInput.addEventListener('input', handlePincodeChange);
    }

    // Bill input
    if (elements.billInput) {
      elements.billInput.addEventListener('input', handleBillChange);
    }

    // Form submission
    if (elements.form) {
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateSolar();
      });
    }

    // EMI tenure slider
    if (elements.emiTenureSlider) {
      elements.emiTenureSlider.addEventListener('input', handleEmiTenureChange);
    }

    // Quote form submission
    if (elements.quoteForm) {
      elements.quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
  }

  // ============================================
  // PINCODE VALIDATION
  // ============================================
  function handlePincodeChange(e) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
    state.pincode = value;

    // Reset states
    elements.locationSuccess.classList.add('hidden');
    elements.locationError.classList.add('hidden');
    state.location = '';

    // Update input styling
    elements.pincodeInput.classList.remove('border-green-500', 'bg-green-50', 'border-red-500');
    elements.pincodeInput.classList.add('border-gray-200');

    if (value.length === 6) {
      validatePincode(value);
    }

    updateCalculateButton();
  }

  function validatePincode(value) {
    const detectedLocation = pincodeDatabase[value];

    if (detectedLocation) {
      state.location = detectedLocation;
      elements.locationText.textContent = detectedLocation;
      elements.locationSuccess.classList.remove('hidden');
      elements.locationError.classList.add('hidden');

      // Update input styling
      elements.pincodeInput.classList.remove('border-gray-200', 'border-red-500');
      elements.pincodeInput.classList.add('border-green-500', 'bg-green-50');

      return true;
    } else {
      state.location = '';
      elements.locationSuccess.classList.add('hidden');
      elements.locationError.classList.remove('hidden');

      // Update input styling
      elements.pincodeInput.classList.remove('border-gray-200', 'border-green-500', 'bg-green-50');
      elements.pincodeInput.classList.add('border-red-500');

      return false;
    }
  }

  // ============================================
  // BILL INPUT HANDLING
  // ============================================
  function handleBillChange(e) {
    state.electricityBill = e.target.value;
    updateCalculateButton();
  }

  // ============================================
  // BUTTON STATE
  // ============================================
  function updateCalculateButton() {
    const isValid = state.location && state.electricityBill && parseFloat(state.electricityBill) >= 500;

    if (isValid) {
      elements.calculateBtn.disabled = false;
      elements.calculateBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      elements.calculateBtn.classList.add('bg-primary', 'hover:bg-blue-700', 'text-white', 'shadow-lg', 'hover:shadow-xl', 'transform', 'hover:scale-[1.02]', 'active:scale-[0.98]');
    } else {
      elements.calculateBtn.disabled = true;
      elements.calculateBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      elements.calculateBtn.classList.remove('bg-primary', 'hover:bg-blue-700', 'text-white', 'shadow-lg', 'hover:shadow-xl', 'transform', 'hover:scale-[1.02]', 'active:scale-[0.98]');
    }
  }

  // ============================================
  // SOLAR CALCULATION
  // ============================================
  let isCalculating = false;

  function calculateSolar() {
    if (!state.location || !state.electricityBill || parseFloat(state.electricityBill) < 500) {
      return;
    }

    // Prevent double calculations
    if (isCalculating) return;
    isCalculating = true;

    // Show loading state
    const btnText = elements.calculateBtn.querySelector('span:last-child');
    const originalText = btnText ? btnText.textContent : 'Calculate Solar Savings';
    if (btnText) btnText.textContent = 'Calculating...';
    elements.calculateBtn.disabled = true;

    const bill = parseFloat(state.electricityBill);

    // System sizing based on pricing structure
    let selectedSystemSize = 3;
    let selectedSystemCost = 200000;

    if (bill < 2000) {
      selectedSystemSize = 3;
      selectedSystemCost = 200000;
    } else if (bill < 3000) {
      selectedSystemSize = 4;
      selectedSystemCost = 230000;
    } else if (bill < 4000) {
      selectedSystemSize = 5;
      selectedSystemCost = 300000;
    } else if (bill < 5000) {
      selectedSystemSize = 7;
      selectedSystemCost = 350000;
    } else {
      selectedSystemSize = 10;
      selectedSystemCost = 450000;
    }

    state.systemSize = selectedSystemSize;
    state.roofArea = Math.round(selectedSystemSize * 100);

    // Savings calculation
    let cumulativeSavings = 0;
    let fiveYearTotal = 0;

    for (let year = 1; year <= 25; year++) {
      const degradation = Math.pow(0.99, year - 1);
      const inflation = Math.pow(1.03, year - 1);
      const yearSavings = bill * 12 * degradation * inflation;
      cumulativeSavings += yearSavings;
      if (year <= 5) fiveYearTotal += yearSavings;
    }

    const avgYearlySavings = cumulativeSavings / 25;
    const avgMonthlySavings = avgYearlySavings / 12;

    state.monthlySavings = Math.round(avgMonthlySavings);
    state.yearlySavings = Math.round(avgYearlySavings);
    state.fiveYearSavings = Math.round(fiveYearTotal);

    state.totalCost = selectedSystemCost;

    // Subsidy calculation - ₹78,000 for systems >= 3kW
    let subsidyCalc = 0;
    if (selectedSystemSize >= 3) {
      subsidyCalc = 78000;
    } else {
      subsidyCalc = (selectedSystemSize / 3) * 78000;
    }
    state.subsidy = Math.round(subsidyCalc);
    state.netCost = Math.round(selectedSystemCost - subsidyCalc);

    const minDownPaymentCalc = Math.round(selectedSystemCost * 0.2);
    state.downPayment = minDownPaymentCalc;
    state.netDownPayment = Math.max(0, minDownPaymentCalc - subsidyCalc);

    calculateEMI(state.netCost, state.emiTenure);

    // Environmental impact
    const yearlyGeneration = selectedSystemSize * 1400;
    const lifetimeGeneration = yearlyGeneration * 25;

    state.co2Mitigated = Math.round(lifetimeGeneration * 0.7);
    state.treesPlanted = Math.round(lifetimeGeneration * 0.7 / 20);
    state.distanceKm = Math.round(lifetimeGeneration * 2.5);

    state.showResults = true;

    // Reset loading state
    isCalculating = false;
    const calcBtnText = elements.calculateBtn.querySelector('span:last-child');
    if (calcBtnText) calcBtnText.textContent = 'Calculate Solar Savings';
    elements.calculateBtn.disabled = false;

    displayResults();
    scrollToResults();
  }

  // ============================================
  // EMI CALCULATION
  // ============================================
  function calculateEMI(principal, months) {
    const rate = 0.095 / 12; // 9.5% annual rate
    const emiCalc = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    state.emi = Math.round(emiCalc);
  }

  function handleEmiTenureChange(e) {
    state.emiTenure = parseInt(e.target.value);
    const years = Math.round(state.emiTenure / 12);
    elements.emiTenureDisplay.textContent = `${years} year${years > 1 ? 's' : ''}`;

    if (state.showResults) {
      calculateEMI(state.netCost, state.emiTenure);
      updateEMIDisplay();
    }
  }

  // ============================================
  // DISPLAY RESULTS
  // ============================================
  function displayResults() {
    // Update all result values
    document.getElementById('systemSizeValue').textContent = `${state.systemSize} kW`;
    document.getElementById('roofAreaValue').textContent = `${state.roofArea} sq. ft.`;
    document.getElementById('monthlySavingsValue').textContent = `₹${formatNumber(state.monthlySavings)}`;
    document.getElementById('yearlySavingsValue').textContent = `₹${formatNumber(state.yearlySavings)}`;
    document.getElementById('fiveYearSavingsValue').textContent = `₹${formatNumber(state.fiveYearSavings)}`;
    document.getElementById('totalCostValue').textContent = `₹${formatNumber(state.totalCost)}`;
    document.getElementById('subsidyValue').textContent = `-₹${formatNumber(state.subsidy)}`;
    document.getElementById('netCostValue').textContent = `₹${formatNumber(state.netCost)}`;

    updateEMIDisplay();

    document.getElementById('co2Value').textContent = formatNumber(state.co2Mitigated);
    document.getElementById('treesValue').textContent = formatNumber(state.treesPlanted);
    document.getElementById('distanceValue').textContent = formatNumber(state.distanceKm);

    // Show results section
    elements.resultsSection.classList.remove('hidden');
  }

  function updateEMIDisplay() {
    document.getElementById('downPaymentValue').textContent = `₹${formatNumber(state.downPayment)}`;
    document.getElementById('emiSubsidyValue').textContent = `-₹${formatNumber(state.subsidy)}`;
    document.getElementById('netDownPaymentValue').textContent = `₹${formatNumber(state.netDownPayment)}`;
    document.getElementById('emiValue').textContent = `₹${formatNumber(state.emi)}`;
  }

  // ============================================
  // TAB SWITCHING
  // ============================================
  window.switchTab = function (tab) {
    state.activeTab = tab;

    // Update tab buttons
    ['System', 'Savings', 'Investment'].forEach(t => {
      const btn = document.getElementById(`tab${t}`);
      const content = document.getElementById(`content${t}`);

      if (t.toLowerCase() === tab) {
        btn.classList.add('tab-active');
        btn.classList.remove('text-gray-500');
        content.classList.remove('hidden');
      } else {
        btn.classList.remove('tab-active');
        btn.classList.add('text-gray-500');
        content.classList.add('hidden');
      }
    });
  };

  // ============================================
  // QUOTE MODAL
  // ============================================
  window.showQuoteModal = function () {
    elements.quoteModal.classList.remove('hidden');
  };

  window.closeQuoteModal = function () {
    elements.quoteModal.classList.add('hidden');
  };

  // Flag to prevent double submissions
  let isSubmitting = false;

  async function handleQuoteSubmit(e) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
      console.log('Form already submitting, ignoring duplicate submit');
      return;
    }

    isSubmitting = true;

    // Get the submit button and show loading state
    const submitBtn = elements.quoteForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = {
      name: document.getElementById('quoteName').value,
      phone: document.getElementById('quotePhone').value,
      email: document.getElementById('quoteEmail').value,
      pincode: state.pincode,
      city: state.location,
      monthlyBill: state.electricityBill,
      systemSize: state.systemSize,
      estimatedCost: state.netCost,
      customerType: 'residential',
      source: 'calculator',
      saveLead: true,
    };

    try {
      // Call /api/calculate with saveLead: true to save both calculator result AND lead
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Required fields for calculation
          monthlyBill: state.electricityBill,
          city: state.location,
          customerType: 'residential',
          pincode: state.pincode,
          // Flag to save lead
          saveLead: true,
          // User contact info for lead
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you! Our team will contact you within 24 hours.');
        closeQuoteModal();
        elements.quoteForm.reset();
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      // Reset submission state
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function formatNumber(num) {
    return num.toLocaleString('en-IN');
  }

  function scrollToResults() {
    if (elements.resultsSection) {
      setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  // ============================================
  // INITIALIZE ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
