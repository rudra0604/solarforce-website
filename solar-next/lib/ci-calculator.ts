/**
 * Commercial & Industrial Solar Savings Calculator
 * 
 * Comprehensive calculator for C&I rooftop and ground-mounted PV systems in India.
 * Supports CAPEX (self-owned) and OPEX/PPA (third-party owned) models.
 * 
 * Key Features:
 * - Region-based solar irradiance data for India
 * - Detailed 25-year cashflow projections
 * - IRR and NPV calculations
 * - Environmental impact metrics
 * - Support for large-scale systems (MW range)
 */

// ============================================================================
// ASSUMPTIONS & BENCHMARKS (Indian C&I Market - 2024/2025)
// ============================================================================

/**
 * ASSUMPTION JUSTIFICATIONS:
 * 
 * 1. Solar Irradiance: Based on MNRE and NREL data for different Indian regions
 *    - Rajasthan/Gujarat: 5.5-6.0 kWh/m²/day (highest in India)
 *    - Maharashtra/MP/Karnataka: 5.0-5.5 kWh/m²/day
 *    - North India (Delhi NCR, UP): 4.5-5.0 kWh/m²/day
 *    - Eastern/Coastal regions: 4.0-4.5 kWh/m²/day
 * 
 * 2. Performance Ratio (PR): 75-80% for well-maintained C&I systems
 *    - Accounts for inverter efficiency, wiring losses, soiling, temperature
 *    - Higher PR for premium installations with regular maintenance
 * 
 * 3. Panel Degradation: 0.5-0.7% per year (industry standard)
 *    - First year: 2% (LID - Light Induced Degradation)
 *    - Years 2-25: 0.5% per year linear degradation
 *    - 25-year output: ~87% of original capacity
 * 
 * 4. EPC Cost: ₹45,000-55,000 per kW for C&I (lower than residential due to scale)
 *    - Includes panels, inverters, mounting, wiring, installation
 *    - Ground-mounted typically 10-15% higher than rooftop
 * 
 * 5. O&M Cost: 1-1.5% of CAPEX per year
 *    - Includes cleaning, monitoring, minor repairs
 *    - Escalates 3-5% annually
 * 
 * 6. Tariff Escalation: 3-5% per year (historical CERC data)
 *    - Industrial tariffs have increased 4-6% annually
 *    - Commercial tariffs slightly higher escalation
 * 
 * 7. Grid Emission Factor: 0.82 kg CO₂/kWh (CEA 2023)
 *    - India's grid is still largely coal-dependent
 *    - Varies by state but national average used
 */

export interface RegionData {
  name: string;
  avgIrradiance: number;      // kWh/m²/day (GHI - Global Horizontal Irradiance)
  peakSunHours: number;       // Equivalent peak sun hours
  avgTariffIndustrial: number; // INR/kWh
  avgTariffCommercial: number; // INR/kWh
  stateDiscomLoss: number;    // % T&D losses
}

export const regionData: Record<string, RegionData> = {
  // High Irradiance Regions (5.5+ kWh/m²/day)
  'Rajasthan': { name: 'Rajasthan', avgIrradiance: 5.8, peakSunHours: 5.5, avgTariffIndustrial: 8.5, avgTariffCommercial: 9.5, stateDiscomLoss: 18 },
  'Gujarat': { name: 'Gujarat', avgIrradiance: 5.6, peakSunHours: 5.3, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.0, stateDiscomLoss: 15 },
  'Jodhpur': { name: 'Jodhpur', avgIrradiance: 5.9, peakSunHours: 5.6, avgTariffIndustrial: 8.5, avgTariffCommercial: 9.5, stateDiscomLoss: 18 },
  'Ahmedabad': { name: 'Ahmedabad', avgIrradiance: 5.5, peakSunHours: 5.2, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.0, stateDiscomLoss: 15 },
  
  // Medium-High Irradiance Regions (5.0-5.5 kWh/m²/day)
  'Maharashtra': { name: 'Maharashtra', avgIrradiance: 5.2, peakSunHours: 4.9, avgTariffIndustrial: 9.5, avgTariffCommercial: 11.0, stateDiscomLoss: 16 },
  'Mumbai': { name: 'Mumbai', avgIrradiance: 5.0, peakSunHours: 4.7, avgTariffIndustrial: 10.0, avgTariffCommercial: 12.0, stateDiscomLoss: 14 },
  'Pune': { name: 'Pune', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 9.5, avgTariffCommercial: 11.0, stateDiscomLoss: 16 },
  'Madhya Pradesh': { name: 'Madhya Pradesh', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 22 },
  'Bhopal': { name: 'Bhopal', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 22 },
  'Indore': { name: 'Indore', avgIrradiance: 5.4, peakSunHours: 5.1, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 22 },
  'Karnataka': { name: 'Karnataka', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 7.8, avgTariffCommercial: 9.0, stateDiscomLoss: 14 },
  'Bangalore': { name: 'Bangalore', avgIrradiance: 5.2, peakSunHours: 4.9, avgTariffIndustrial: 7.8, avgTariffCommercial: 9.0, stateDiscomLoss: 14 },
  'Andhra Pradesh': { name: 'Andhra Pradesh', avgIrradiance: 5.4, peakSunHours: 5.1, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 12 },
  'Telangana': { name: 'Telangana', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 13 },
  'Hyderabad': { name: 'Hyderabad', avgIrradiance: 5.3, peakSunHours: 5.0, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 13 },
  
  // Medium Irradiance Regions (4.5-5.0 kWh/m²/day)
  'Delhi': { name: 'Delhi', avgIrradiance: 4.8, peakSunHours: 4.5, avgTariffIndustrial: 9.0, avgTariffCommercial: 10.5, stateDiscomLoss: 12 },
  'NCR': { name: 'NCR', avgIrradiance: 4.8, peakSunHours: 4.5, avgTariffIndustrial: 9.0, avgTariffCommercial: 10.5, stateDiscomLoss: 14 },
  'Gurugram': { name: 'Gurugram', avgIrradiance: 4.9, peakSunHours: 4.6, avgTariffIndustrial: 8.5, avgTariffCommercial: 10.0, stateDiscomLoss: 20 },
  'Noida': { name: 'Noida', avgIrradiance: 4.7, peakSunHours: 4.4, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 22 },
  'Uttar Pradesh': { name: 'Uttar Pradesh', avgIrradiance: 4.6, peakSunHours: 4.3, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 24 },
  'Punjab': { name: 'Punjab', avgIrradiance: 4.9, peakSunHours: 4.6, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 16 },
  'Haryana': { name: 'Haryana', avgIrradiance: 4.8, peakSunHours: 4.5, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 20 },
  'Tamil Nadu': { name: 'Tamil Nadu', avgIrradiance: 5.0, peakSunHours: 4.7, avgTariffIndustrial: 7.0, avgTariffCommercial: 8.0, stateDiscomLoss: 11 },
  'Chennai': { name: 'Chennai', avgIrradiance: 4.9, peakSunHours: 4.6, avgTariffIndustrial: 7.0, avgTariffCommercial: 8.0, stateDiscomLoss: 11 },
  
  // Lower Irradiance Regions (4.0-4.5 kWh/m²/day)
  'West Bengal': { name: 'West Bengal', avgIrradiance: 4.3, peakSunHours: 4.0, avgTariffIndustrial: 8.5, avgTariffCommercial: 10.0, stateDiscomLoss: 20 },
  'Kolkata': { name: 'Kolkata', avgIrradiance: 4.2, peakSunHours: 3.9, avgTariffIndustrial: 8.5, avgTariffCommercial: 10.0, stateDiscomLoss: 20 },
  'Odisha': { name: 'Odisha', avgIrradiance: 4.5, peakSunHours: 4.2, avgTariffIndustrial: 6.5, avgTariffCommercial: 7.5, stateDiscomLoss: 22 },
  'Bihar': { name: 'Bihar', avgIrradiance: 4.4, peakSunHours: 4.1, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 30 },
  'Jharkhand': { name: 'Jharkhand', avgIrradiance: 4.5, peakSunHours: 4.2, avgTariffIndustrial: 7.0, avgTariffCommercial: 8.0, stateDiscomLoss: 25 },
  'Kerala': { name: 'Kerala', avgIrradiance: 4.5, peakSunHours: 4.2, avgTariffIndustrial: 7.5, avgTariffCommercial: 8.5, stateDiscomLoss: 12 },
  'Assam': { name: 'Assam', avgIrradiance: 4.0, peakSunHours: 3.7, avgTariffIndustrial: 7.0, avgTariffCommercial: 8.0, stateDiscomLoss: 25 },
  
  // Default for unknown regions
  'India': { name: 'India', avgIrradiance: 5.0, peakSunHours: 4.7, avgTariffIndustrial: 8.0, avgTariffCommercial: 9.5, stateDiscomLoss: 18 },
};

// Pincode prefix to region mapping
export const pincodeToRegion: Record<string, string> = {
  // Rajasthan
  '302': 'Rajasthan', '303': 'Rajasthan', '305': 'Jodhpur', '306': 'Jodhpur', '342': 'Jodhpur',
  // Gujarat
  '380': 'Ahmedabad', '382': 'Ahmedabad', '360': 'Gujarat', '361': 'Gujarat', '395': 'Gujarat',
  // Maharashtra
  '400': 'Mumbai', '401': 'Mumbai', '411': 'Pune', '412': 'Pune', '440': 'Maharashtra', '441': 'Maharashtra',
  // Madhya Pradesh
  '462': 'Bhopal', '452': 'Indore', '474': 'Madhya Pradesh', '482': 'Madhya Pradesh',
  // Karnataka
  '560': 'Bangalore', '561': 'Bangalore', '570': 'Karnataka', '580': 'Karnataka',
  // Telangana/AP
  '500': 'Hyderabad', '501': 'Hyderabad', '520': 'Andhra Pradesh', '530': 'Andhra Pradesh',
  // Delhi NCR
  '110': 'Delhi', '122': 'Gurugram', '201': 'Noida', '121': 'Haryana',
  // Tamil Nadu
  '600': 'Chennai', '601': 'Chennai', '641': 'Tamil Nadu', '625': 'Tamil Nadu',
  // West Bengal
  '700': 'Kolkata', '711': 'Kolkata', '712': 'West Bengal',
  // UP
  '226': 'Uttar Pradesh', '208': 'Uttar Pradesh', '221': 'Uttar Pradesh',
  // Punjab
  '140': 'Punjab', '141': 'Punjab', '143': 'Punjab', '160': 'Punjab',
  // Others
  '751': 'Odisha', '800': 'Bihar', '781': 'Assam', '682': 'Kerala', '695': 'Kerala',
};

// ============================================================================
// CONSTANTS & DEFAULT VALUES
// ============================================================================

export const CI_CONSTANTS = {
  // System Performance
  PERFORMANCE_RATIO: 0.78,              // 78% - accounts for all system losses
  FIRST_YEAR_DEGRADATION: 0.02,         // 2% LID (Light Induced Degradation)
  ANNUAL_DEGRADATION: 0.005,            // 0.5% per year after first year
  SYSTEM_LIFETIME_YEARS: 25,
  
  // Space Requirements
  AREA_PER_KW_SQFT_ROOFTOP: 100,        // sq.ft per kW for rooftop
  AREA_PER_KW_SQFT_GROUND: 120,         // sq.ft per kW for ground-mounted (more spacing)
  
  // Financial Parameters
  EPC_COST_PER_KW_ROOFTOP: 48000,       // INR per kW (C&I rooftop)
  EPC_COST_PER_KW_GROUND: 52000,        // INR per kW (ground-mounted)
  OM_COST_PERCENT: 0.01,                 // 1% of CAPEX per year
  OM_ESCALATION: 0.04,                   // 4% O&M cost escalation per year
  TARIFF_ESCALATION: 0.04,               // 4% tariff escalation per year
  DISCOUNT_RATE: 0.10,                   // 10% discount rate for NPV
  
  // PPA/OPEX Model
  PPA_TARIFF_PER_KWH: 4.50,              // INR/kWh typical PPA rate
  PPA_ESCALATION: 0.03,                   // 3% PPA tariff escalation per year
  
  // Environmental
  GRID_EMISSION_FACTOR: 0.82,            // kg CO₂ per kWh (CEA 2023)
  TREES_CO2_ABSORPTION: 20,              // kg CO₂ absorbed per tree per year
  
  // Constraints
  MIN_SYSTEM_SIZE_KW: 10,                // Minimum C&I system size
  MAX_SYSTEM_SIZE_MW: 50,                // Maximum system size (50 MW)
  NET_METERING_LIMIT_KW: 500,            // Typical state net metering limit
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type CustomerSegment = 'industrial' | 'commercial';
export type OwnershipModel = 'capex' | 'opex';
export type InstallationType = 'rooftop' | 'ground';

export interface CICalculatorInput {
  // Location
  city: string;
  pincode?: string;
  
  // Consumption (one of these required)
  monthlyConsumption?: number;          // kWh per month
  monthlyBill?: number;                  // INR per month
  
  // Tariff
  avgTariff?: number;                    // INR per kWh (if not provided, uses regional default)
  
  // System Configuration
  customerSegment: CustomerSegment;
  sanctionedLoad?: number;               // kVA (optional)
  availableArea?: number;                // sq.ft
  operatingDays?: number;                // days per year (default: 300)
  installationType: InstallationType;
  
  // Financial Model
  ownershipModel: OwnershipModel;
  ppaTariff?: number;                    // INR/kWh for OPEX model
  ppaEscalation?: number;                // % for OPEX model
  
  // Consumption Pattern
  netMeteringPercent?: number;           // % of generation exported (0-100)
  captiveConsumptionPercent?: number;    // % of generation self-consumed (0-100)
  
  // Advanced Options
  customEpcCost?: number;                // INR per kW
  customOmPercent?: number;              // % of CAPEX
  customDegradation?: number;            // % per year
  customPR?: number;                     // Performance Ratio (0-1)
  discountRate?: number;                 // % for NPV calculation
  tariffEscalation?: number;             // % annual tariff increase
}

export interface YearlyCashflow {
  year: number;
  generation: number;                    // kWh
  degradationFactor: number;             // multiplier (e.g., 0.98)
  tariffRate: number;                    // INR/kWh
  grossSavings: number;                  // INR
  omCost: number;                        // INR (CAPEX only)
  netSavings: number;                    // INR
  cumulativeSavings: number;             // INR
  cumulativeCashflow: number;            // INR (after initial investment)
  discountedCashflow: number;            // INR (for NPV)
  co2Avoided: number;                    // kg
}

export interface CICalculationResult {
  // Input Summary
  input: {
    city: string;
    region: string;
    monthlyConsumption: number;
    annualConsumption: number;
    avgTariff: number;
    customerSegment: CustomerSegment;
    ownershipModel: OwnershipModel;
    installationType: InstallationType;
    availableArea: number;
    operatingDays: number;
    netMeteringPercent: number;
    captivePercent: number;
  };
  
  // System Specifications
  system: {
    recommendedCapacity: number;         // kW
    recommendedCapacityMW: number;       // MW
    areaBasedCapacity: number;           // kW (max based on area)
    loadBasedCapacity: number;           // kW (based on consumption)
    finalCapacity: number;               // kW (actual recommendation)
    areaRequired: number;                // sq.ft
    performanceRatio: number;
    annualGeneration: number;            // kWh first year
    specificYield: number;               // kWh/kWp/year
    capacityUtilizationFactor: number;   // % (CUF)
  };
  
  // Financial Results (CAPEX)
  capex?: {
    totalInvestment: number;             // INR
    epcCostPerKw: number;                // INR
    subsidyAmount: number;               // INR (if applicable)
    netInvestment: number;               // INR
    annualOmCost: number;                // INR (first year)
    simplePaybackYears: number;
    irr: number;                          // % Internal Rate of Return
    npv: number;                          // INR Net Present Value
    lcoe: number;                         // INR/kWh Levelized Cost of Energy
    roi25Year: number;                   // % Return on Investment
  };
  
  // Financial Results (OPEX/PPA)
  opex?: {
    ppaTariff: number;                   // INR/kWh
    ppaEscalation: number;               // %
    firstYearSavings: number;            // INR
    lifetimeSavings: number;             // INR
    avgSavingsPercent: number;           // % savings vs grid
  };
  
  // Savings Summary
  savings: {
    firstYearSavings: number;            // INR
    year5CumulativeSavings: number;      // INR
    year10CumulativeSavings: number;     // INR
    lifetimeSavings: number;             // INR (25 years)
    avgMonthlySavings: number;           // INR (first year)
  };
  
  // Environmental Impact
  environmental: {
    annualCo2Avoided: number;            // tonnes
    lifetimeCo2Avoided: number;          // tonnes
    treesEquivalent: number;             // number of trees
    carsOffRoad: number;                 // equivalent cars
    homesElectrified: number;            // equivalent homes
  };
  
  // 25-Year Cashflow
  cashflow: YearlyCashflow[];
  
  // Metadata
  metadata: {
    calculatedAt: string;
    assumptions: string[];
    warnings: string[];
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get region data from city name or pincode
 */
export function getRegionFromLocation(city?: string, pincode?: string): RegionData {
  // Try pincode first
  if (pincode && pincode.length >= 3) {
    const prefix = pincode.substring(0, 3);
    const regionName = pincodeToRegion[prefix];
    if (regionName && regionData[regionName]) {
      return regionData[regionName];
    }
  }
  
  // Try city name
  if (city) {
    const normalizedCity = city.trim();
    // Exact match
    if (regionData[normalizedCity]) {
      return regionData[normalizedCity];
    }
    // Case-insensitive match
    const cityLower = normalizedCity.toLowerCase();
    for (const [key, data] of Object.entries(regionData)) {
      if (key.toLowerCase() === cityLower) {
        return data;
      }
    }
    // Partial match
    for (const [key, data] of Object.entries(regionData)) {
      if (key.toLowerCase().includes(cityLower) || cityLower.includes(key.toLowerCase())) {
        return data;
      }
    }
  }
  
  // Default to India average
  return regionData['India'];
}

/**
 * Calculate system capacity based on consumption
 * Formula: Capacity (kW) = Annual Consumption (kWh) / (Peak Sun Hours × 365 × PR)
 */
export function calculateCapacityFromConsumption(
  annualConsumption: number,
  peakSunHours: number,
  performanceRatio: number
): number {
  const annualGenPerKw = peakSunHours * 365 * performanceRatio;
  return annualConsumption / annualGenPerKw;
}

/**
 * Calculate maximum capacity based on available area
 */
export function calculateCapacityFromArea(
  area: number,
  installationType: InstallationType
): number {
  const areaPerKw = installationType === 'rooftop' 
    ? CI_CONSTANTS.AREA_PER_KW_SQFT_ROOFTOP 
    : CI_CONSTANTS.AREA_PER_KW_SQFT_GROUND;
  return area / areaPerKw;
}

/**
 * Calculate annual energy generation
 * Formula: Generation (kWh) = Capacity (kW) × Peak Sun Hours × 365 × PR × Degradation Factor
 */
export function calculateAnnualGeneration(
  capacity: number,
  peakSunHours: number,
  performanceRatio: number,
  degradationFactor: number = 1
): number {
  return capacity * peakSunHours * 365 * performanceRatio * degradationFactor;
}

/**
 * Calculate degradation factor for a given year
 * Year 1: 98% (2% LID)
 * Year 2+: 0.5% linear degradation from year 1 output
 */
export function calculateDegradationFactor(year: number): number {
  if (year <= 0) return 1;
  if (year === 1) return 1 - CI_CONSTANTS.FIRST_YEAR_DEGRADATION;
  
  const afterLID = 1 - CI_CONSTANTS.FIRST_YEAR_DEGRADATION;
  const yearsAfterFirst = year - 1;
  return afterLID * Math.pow(1 - CI_CONSTANTS.ANNUAL_DEGRADATION, yearsAfterFirst);
}

/**
 * Calculate IRR (Internal Rate of Return) using Newton-Raphson method
 * IRR is the discount rate that makes NPV = 0
 */
export function calculateIRR(initialInvestment: number, cashflows: number[]): number {
  const maxIterations = 100;
  const tolerance = 0.0001;
  let guess = 0.10; // Start with 10%
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = -initialInvestment;
    let npvDerivative = 0;
    
    for (let t = 0; t < cashflows.length; t++) {
      const discountFactor = Math.pow(1 + guess, t + 1);
      npv += cashflows[t] / discountFactor;
      npvDerivative -= (t + 1) * cashflows[t] / Math.pow(1 + guess, t + 2);
    }
    
    if (Math.abs(npv) < tolerance) {
      return guess * 100; // Return as percentage
    }
    
    if (Math.abs(npvDerivative) < 1e-10) {
      break; // Avoid division by zero
    }
    
    guess = guess - npv / npvDerivative;
    
    // Keep guess in reasonable bounds
    if (guess < -0.99) guess = -0.5;
    if (guess > 1) guess = 0.5;
  }
  
  return guess * 100;
}

/**
 * Calculate NPV (Net Present Value)
 * NPV = -Initial Investment + Σ(Cashflow_t / (1 + r)^t)
 */
export function calculateNPV(initialInvestment: number, cashflows: number[], discountRate: number): number {
  let npv = -initialInvestment;
  for (let t = 0; t < cashflows.length; t++) {
    npv += cashflows[t] / Math.pow(1 + discountRate, t + 1);
  }
  return npv;
}

/**
 * Calculate LCOE (Levelized Cost of Energy)
 * LCOE = (Total Lifetime Cost) / (Total Lifetime Energy Production)
 */
export function calculateLCOE(
  initialInvestment: number,
  annualOmCost: number,
  omEscalation: number,
  annualGeneration: number,
  years: number,
  discountRate: number
): number {
  let totalDiscountedCost = initialInvestment;
  let totalDiscountedEnergy = 0;
  
  for (let t = 1; t <= years; t++) {
    const degradation = calculateDegradationFactor(t);
    const yearlyGeneration = annualGeneration * degradation;
    const yearlyOm = annualOmCost * Math.pow(1 + omEscalation, t - 1);
    
    totalDiscountedCost += yearlyOm / Math.pow(1 + discountRate, t);
    totalDiscountedEnergy += yearlyGeneration / Math.pow(1 + discountRate, t);
  }
  
  return totalDiscountedCost / totalDiscountedEnergy;
}

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

export function performCICalculation(input: CICalculatorInput): CICalculationResult {
  const warnings: string[] = [];
  const assumptions: string[] = [];
  
  // Get region data
  const region = getRegionFromLocation(input.city, input.pincode);
  assumptions.push(`Region: ${region.name} (Solar irradiance: ${region.avgIrradiance} kWh/m²/day)`);
  
  // Determine tariff
  const avgTariff = input.avgTariff || 
    (input.customerSegment === 'industrial' ? region.avgTariffIndustrial : region.avgTariffCommercial);
  assumptions.push(`Electricity tariff: ₹${avgTariff.toFixed(2)}/kWh`);
  
  // Calculate consumption
  let monthlyConsumption: number;
  if (input.monthlyConsumption) {
    monthlyConsumption = input.monthlyConsumption;
  } else if (input.monthlyBill) {
    monthlyConsumption = input.monthlyBill / avgTariff;
  } else {
    throw new Error('Either monthly consumption or monthly bill is required');
  }
  
  const annualConsumption = monthlyConsumption * 12;
  
  // Operating parameters
  const operatingDays = input.operatingDays || 300;
  const netMeteringPercent = input.netMeteringPercent ?? 20;
  const captivePercent = input.captiveConsumptionPercent ?? 80;
  assumptions.push(`Operating days: ${operatingDays}/year`);
  assumptions.push(`Captive consumption: ${captivePercent}%, Net metering: ${netMeteringPercent}%`);
  
  // Performance parameters
  const pr = input.customPR || CI_CONSTANTS.PERFORMANCE_RATIO;
  assumptions.push(`Performance ratio: ${(pr * 100).toFixed(0)}%`);
  
  // Calculate required capacity based on consumption
  const loadBasedCapacity = calculateCapacityFromConsumption(annualConsumption, region.peakSunHours, pr);
  
  // Calculate max capacity based on available area
  const availableArea = input.availableArea || loadBasedCapacity * 
    (input.installationType === 'rooftop' ? CI_CONSTANTS.AREA_PER_KW_SQFT_ROOFTOP : CI_CONSTANTS.AREA_PER_KW_SQFT_GROUND);
  const areaBasedCapacity = calculateCapacityFromArea(availableArea, input.installationType);
  
  // Determine final capacity (minimum of area constraint and load requirement)
  let recommendedCapacity = Math.min(loadBasedCapacity, areaBasedCapacity);
  
  // Apply constraints
  if (recommendedCapacity < CI_CONSTANTS.MIN_SYSTEM_SIZE_KW) {
    warnings.push(`System size below minimum C&I threshold (${CI_CONSTANTS.MIN_SYSTEM_SIZE_KW} kW). Consider residential solar.`);
    recommendedCapacity = CI_CONSTANTS.MIN_SYSTEM_SIZE_KW;
  }
  if (recommendedCapacity > CI_CONSTANTS.MAX_SYSTEM_SIZE_MW * 1000) {
    warnings.push(`System capped at ${CI_CONSTANTS.MAX_SYSTEM_SIZE_MW} MW maximum.`);
    recommendedCapacity = CI_CONSTANTS.MAX_SYSTEM_SIZE_MW * 1000;
  }
  
  // Check net metering limit
  if (netMeteringPercent > 0 && recommendedCapacity > CI_CONSTANTS.NET_METERING_LIMIT_KW) {
    warnings.push(`System exceeds typical net metering limit (${CI_CONSTANTS.NET_METERING_LIMIT_KW} kW). Consider captive/open access model.`);
  }
  
  // Round to practical values
  const finalCapacity = Math.round(recommendedCapacity);
  const areaRequired = finalCapacity * 
    (input.installationType === 'rooftop' ? CI_CONSTANTS.AREA_PER_KW_SQFT_ROOFTOP : CI_CONSTANTS.AREA_PER_KW_SQFT_GROUND);
  
  // Calculate first year generation
  const firstYearGeneration = calculateAnnualGeneration(finalCapacity, region.peakSunHours, pr, calculateDegradationFactor(1));
  
  // Specific yield and CUF
  const specificYield = firstYearGeneration / finalCapacity;
  const cuf = (firstYearGeneration / (finalCapacity * 8760)) * 100;
  assumptions.push(`Specific yield: ${specificYield.toFixed(0)} kWh/kWp/year`);
  assumptions.push(`Capacity utilization factor: ${cuf.toFixed(1)}%`);
  
  // Financial parameters
  const epcCostPerKw = input.customEpcCost || 
    (input.installationType === 'rooftop' ? CI_CONSTANTS.EPC_COST_PER_KW_ROOFTOP : CI_CONSTANTS.EPC_COST_PER_KW_GROUND);
  const omPercent = input.customOmPercent || CI_CONSTANTS.OM_COST_PERCENT;
  const discountRate = (input.discountRate || 10) / 100;
  const tariffEscalation = (input.tariffEscalation || 4) / 100;
  
  assumptions.push(`EPC cost: ₹${(epcCostPerKw / 1000).toFixed(1)}K/kW`);
  assumptions.push(`O&M cost: ${(omPercent * 100).toFixed(1)}% of CAPEX/year`);
  assumptions.push(`Tariff escalation: ${(tariffEscalation * 100).toFixed(0)}%/year`);
  assumptions.push(`Discount rate: ${(discountRate * 100).toFixed(0)}%`);
  
  // Generate 25-year cashflow
  const cashflows: YearlyCashflow[] = [];
  const annualNetCashflows: number[] = [];
  
  const totalInvestment = finalCapacity * epcCostPerKw;
  const firstYearOm = totalInvestment * omPercent;
  let cumulativeSavings = 0;
  let cumulativeCashflow = -totalInvestment;
  let simplePaybackYear = 0;
  
  for (let year = 1; year <= CI_CONSTANTS.SYSTEM_LIFETIME_YEARS; year++) {
    const degradation = calculateDegradationFactor(year);
    const generation = calculateAnnualGeneration(finalCapacity, region.peakSunHours, pr, degradation);
    const tariffRate = avgTariff * Math.pow(1 + tariffEscalation, year - 1);
    const omCost = firstYearOm * Math.pow(1 + CI_CONSTANTS.OM_ESCALATION, year - 1);
    
    let grossSavings: number;
    let netSavings: number;
    
    if (input.ownershipModel === 'capex') {
      grossSavings = generation * tariffRate;
      netSavings = grossSavings - omCost;
    } else {
      // OPEX/PPA model
      const ppaTariff = input.ppaTariff || CI_CONSTANTS.PPA_TARIFF_PER_KWH;
      const ppaEsc = input.ppaEscalation || CI_CONSTANTS.PPA_ESCALATION;
      const yearlyPpaTariff = ppaTariff * Math.pow(1 + ppaEsc, year - 1);
      grossSavings = generation * (tariffRate - yearlyPpaTariff);
      netSavings = grossSavings; // No O&M in OPEX model
    }
    
    cumulativeSavings += netSavings;
    cumulativeCashflow += netSavings;
    
    const discountedCashflow = netSavings / Math.pow(1 + discountRate, year);
    const co2Avoided = generation * CI_CONSTANTS.GRID_EMISSION_FACTOR / 1000; // tonnes
    
    // Track simple payback
    if (simplePaybackYear === 0 && cumulativeCashflow >= 0) {
      simplePaybackYear = year;
    }
    
    cashflows.push({
      year,
      generation: Math.round(generation),
      degradationFactor: degradation,
      tariffRate: Math.round(tariffRate * 100) / 100,
      grossSavings: Math.round(grossSavings),
      omCost: input.ownershipModel === 'capex' ? Math.round(omCost) : 0,
      netSavings: Math.round(netSavings),
      cumulativeSavings: Math.round(cumulativeSavings),
      cumulativeCashflow: Math.round(cumulativeCashflow),
      discountedCashflow: Math.round(discountedCashflow),
      co2Avoided: Math.round(co2Avoided * 10) / 10,
    });
    
    annualNetCashflows.push(netSavings);
  }
  
  // Calculate financial metrics for CAPEX model
  let capexResult: CICalculationResult['capex'];
  if (input.ownershipModel === 'capex') {
    const irr = calculateIRR(totalInvestment, annualNetCashflows);
    const npv = calculateNPV(totalInvestment, annualNetCashflows, discountRate);
    const lcoe = calculateLCOE(
      totalInvestment, 
      firstYearOm, 
      CI_CONSTANTS.OM_ESCALATION,
      firstYearGeneration,
      CI_CONSTANTS.SYSTEM_LIFETIME_YEARS,
      discountRate
    );
    const roi25Year = ((cumulativeSavings + totalInvestment) / totalInvestment - 1) * 100;
    
    capexResult = {
      totalInvestment: Math.round(totalInvestment),
      epcCostPerKw: Math.round(epcCostPerKw),
      subsidyAmount: 0, // C&I typically doesn't get residential subsidy
      netInvestment: Math.round(totalInvestment),
      annualOmCost: Math.round(firstYearOm),
      simplePaybackYears: simplePaybackYear || Math.ceil(totalInvestment / annualNetCashflows[0]),
      irr: Math.round(irr * 10) / 10,
      npv: Math.round(npv),
      lcoe: Math.round(lcoe * 100) / 100,
      roi25Year: Math.round(roi25Year),
    };
  }
  
  // Calculate OPEX metrics
  let opexResult: CICalculationResult['opex'];
  if (input.ownershipModel === 'opex') {
    const ppaTariff = input.ppaTariff || CI_CONSTANTS.PPA_TARIFF_PER_KWH;
    const ppaEsc = input.ppaEscalation || CI_CONSTANTS.PPA_ESCALATION;
    const firstYearSavings = firstYearGeneration * (avgTariff - ppaTariff);
    const avgSavingsPercent = ((avgTariff - ppaTariff) / avgTariff) * 100;
    
    opexResult = {
      ppaTariff,
      ppaEscalation: ppaEsc * 100,
      firstYearSavings: Math.round(firstYearSavings),
      lifetimeSavings: Math.round(cumulativeSavings),
      avgSavingsPercent: Math.round(avgSavingsPercent),
    };
  }
  
  // Environmental impact
  const lifetimeCo2Avoided = cashflows.reduce((sum, cf) => sum + cf.co2Avoided, 0);
  const treesEquivalent = Math.round(lifetimeCo2Avoided * 1000 / CI_CONSTANTS.TREES_CO2_ABSORPTION / 25);
  const carsOffRoad = Math.round(lifetimeCo2Avoided / 4.6); // Average car emits 4.6 tonnes CO2/year
  const homesElectrified = Math.round(firstYearGeneration / 3500); // Average Indian home uses ~3500 kWh/year
  
  return {
    input: {
      city: input.city,
      region: region.name,
      monthlyConsumption: Math.round(monthlyConsumption),
      annualConsumption: Math.round(annualConsumption),
      avgTariff,
      customerSegment: input.customerSegment,
      ownershipModel: input.ownershipModel,
      installationType: input.installationType,
      availableArea: Math.round(availableArea),
      operatingDays,
      netMeteringPercent,
      captivePercent,
    },
    system: {
      recommendedCapacity: Math.round(loadBasedCapacity),
      recommendedCapacityMW: Math.round(loadBasedCapacity / 100) / 10,
      areaBasedCapacity: Math.round(areaBasedCapacity),
      loadBasedCapacity: Math.round(loadBasedCapacity),
      finalCapacity,
      areaRequired: Math.round(areaRequired),
      performanceRatio: pr,
      annualGeneration: Math.round(firstYearGeneration),
      specificYield: Math.round(specificYield),
      capacityUtilizationFactor: Math.round(cuf * 10) / 10,
    },
    capex: capexResult,
    opex: opexResult,
    savings: {
      firstYearSavings: Math.round(annualNetCashflows[0]),
      year5CumulativeSavings: Math.round(cashflows.slice(0, 5).reduce((sum, cf) => sum + cf.netSavings, 0)),
      year10CumulativeSavings: Math.round(cashflows.slice(0, 10).reduce((sum, cf) => sum + cf.netSavings, 0)),
      lifetimeSavings: Math.round(cumulativeSavings),
      avgMonthlySavings: Math.round(annualNetCashflows[0] / 12),
    },
    environmental: {
      annualCo2Avoided: Math.round(cashflows[0].co2Avoided * 10) / 10,
      lifetimeCo2Avoided: Math.round(lifetimeCo2Avoided),
      treesEquivalent,
      carsOffRoad,
      homesElectrified,
    },
    cashflow: cashflows,
    metadata: {
      calculatedAt: new Date().toISOString(),
      assumptions,
      warnings,
    },
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  performCICalculation,
  getRegionFromLocation,
  calculateCapacityFromConsumption,
  calculateCapacityFromArea,
  calculateAnnualGeneration,
  calculateDegradationFactor,
  calculateIRR,
  calculateNPV,
  calculateLCOE,
  CI_CONSTANTS,
  regionData,
};
