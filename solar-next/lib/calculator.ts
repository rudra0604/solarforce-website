// Region-specific data for solar calculations
export interface RegionData {
  state: string;
  avgTariff: number; // Rs per kWh
  solarIrradiance: number; // kWh/m²/day
  subsidyMultiplier: number;
}

// State-wise electricity tariffs and solar irradiance
export const regionData: Record<string, RegionData> = {
  // Madhya Pradesh
  'madhya pradesh': { state: 'Madhya Pradesh', avgTariff: 7.5, solarIrradiance: 5.5, subsidyMultiplier: 1.0 },
  'bhopal': { state: 'Madhya Pradesh', avgTariff: 7.5, solarIrradiance: 5.5, subsidyMultiplier: 1.0 },
  'indore': { state: 'Madhya Pradesh', avgTariff: 7.5, solarIrradiance: 5.5, subsidyMultiplier: 1.0 },
  'gwalior': { state: 'Madhya Pradesh', avgTariff: 7.5, solarIrradiance: 5.4, subsidyMultiplier: 1.0 },
  'bhind': { state: 'Madhya Pradesh', avgTariff: 7.5, solarIrradiance: 5.3, subsidyMultiplier: 1.0 },

  // Delhi & NCR
  'delhi': { state: 'Delhi', avgTariff: 8.5, solarIrradiance: 5.2, subsidyMultiplier: 1.0 },
  'new delhi': { state: 'Delhi', avgTariff: 8.5, solarIrradiance: 5.2, subsidyMultiplier: 1.0 },
  'gurugram': { state: 'Haryana', avgTariff: 7.8, solarIrradiance: 5.3, subsidyMultiplier: 1.0 },
  'gurgaon': { state: 'Haryana', avgTariff: 7.8, solarIrradiance: 5.3, subsidyMultiplier: 1.0 },
  'noida': { state: 'Uttar Pradesh', avgTariff: 7.2, solarIrradiance: 5.2, subsidyMultiplier: 1.0 },
  'ncr': { state: 'NCR', avgTariff: 8.0, solarIrradiance: 5.2, subsidyMultiplier: 1.0 },

  // Default fallback
  'default': { state: 'India', avgTariff: 8.0, solarIrradiance: 5.0, subsidyMultiplier: 1.0 },
};

// Get region data by city name
export function getRegionData(city: string): RegionData {
  const normalizedCity = city.toLowerCase().trim();
  return regionData[normalizedCity] || regionData['default'];
}

// PM Surya Ghar subsidy calculation (residential only)
export function calculateSubsidy(capacity: number, customerType: string): number {
  if (customerType !== 'residential') return 0;

  if (capacity <= 1) return 30000;
  if (capacity <= 2) return 60000;
  if (capacity <= 3) return 78000;
  return 78000; // Max subsidy for systems above 3kW
}

// Calculate system capacity based on consumption
export function calculateSystemCapacity(annualUnits: number, solarIrradiance: number): number {
  // Annual generation per kW = irradiance * 365 * 0.75 (performance ratio)
  const annualGenPerKW = solarIrradiance * 365 * 0.75;
  const capacity = annualUnits / annualGenPerKW;

  // Round to nearest 0.5 kW
  return Math.ceil(capacity * 2) / 2;
}

// Calculate rooftop area requirement
export function calculateRooftopArea(capacity: number): number {
  // 1 kW requires approximately 100 sq.ft (considering spacing, walkways, etc.)
  return Math.ceil(capacity * 100);
}

// Calculate installation cost
export function calculateInstallationCost(capacity: number, customerType: string): number {
  let costPerKW: number;

  switch (customerType) {
    case 'residential':
      costPerKW = 65000; // Rs 65,000 per kW for residential
      break;
    case 'commercial':
      costPerKW = 55000; // Rs 55,000 per kW for commercial (economies of scale)
      break;
    case 'housing-society':
      costPerKW = 58000; // Rs 58,000 per kW for housing society
      break;
    default:
      costPerKW = 65000;
  }

  return Math.round(capacity * costPerKW);
}

// Calculate savings projections
export interface SavingsProjection {
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number; // 25 years
  paybackPeriod: number; // years
}

export function calculateSavings(
  annualUnits: number,
  avgTariff: number,
  netCost: number,
  inflationRate: number = 0.06 // 6% annual tariff increase
): SavingsProjection {
  const yearlyBill = annualUnits * avgTariff;

  // Calculate lifetime savings with inflation
  let totalSavings = 0;
  let currentTariff = avgTariff;

  for (let year = 1; year <= 25; year++) {
    currentTariff = currentTariff * (1 + inflationRate);
    totalSavings += annualUnits * currentTariff * 0.85; // 85% solar coverage
  }

  const annualSavings = yearlyBill * 0.85; // 85% savings in first year
  const monthlySavings = annualSavings / 12;
  const paybackPeriod = netCost / annualSavings;

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    lifetimeSavings: Math.round(totalSavings),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10, // Round to 1 decimal
  };
}

// Calculate environmental impact
export interface EnvironmentalImpact {
  annualGeneration: number; // kWh
  co2Offset: number; // tons per year
  treesEquivalent: number;
}

export function calculateEnvironmentalImpact(
  capacity: number,
  solarIrradiance: number
): EnvironmentalImpact {
  // Annual generation = capacity * irradiance * 365 * 0.75 (performance ratio)
  const annualGeneration = Math.round(capacity * solarIrradiance * 365 * 0.75);

  // CO2 offset: 1 kWh solar = 0.82 kg CO2 saved (India grid average)
  const co2Offset = Math.round((annualGeneration * 0.82) / 1000 * 10) / 10; // tons

  // 1 tree absorbs ~20 kg CO2 per year
  const treesEquivalent = Math.round((co2Offset * 1000) / 20);

  return {
    annualGeneration,
    co2Offset,
    treesEquivalent,
  };
}

// Complete calculation result
export interface CalculationResult {
  // System specifications
  recommendedCapacity: number;
  requiredArea: number;

  // Financial
  estimatedCost: number;
  subsidyAmount: number;
  netCost: number;

  // Savings
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  paybackPeriod: number;

  // Environmental
  annualGeneration: number;
  co2Offset: number;
  treesEquivalent: number;

  // Metadata
  region: string;
  avgTariff: number;
  solarIrradiance: number;
}

export function performCompleteCalculation(
  monthlyBill: number,
  city: string,
  customerType: 'residential' | 'commercial' | 'housing-society',
  rooftopArea?: number
): CalculationResult {
  // Get region-specific data
  const region = getRegionData(city);

  // Calculate consumption
  const monthlyUnits = monthlyBill / region.avgTariff;
  const annualUnits = monthlyUnits * 12;

  // Calculate system capacity
  const recommendedCapacity = calculateSystemCapacity(annualUnits, region.solarIrradiance);

  // Check if rooftop area is sufficient
  const requiredArea = calculateRooftopArea(recommendedCapacity);
  if (rooftopArea && rooftopArea < requiredArea) {
    // Adjust capacity based on available area
    const adjustedCapacity = Math.floor((rooftopArea / 100) * 2) / 2;
    return performCompleteCalculation(
      (adjustedCapacity * region.solarIrradiance * 365 * 0.75 / 12) * region.avgTariff,
      city,
      customerType,
      rooftopArea
    );
  }

  // Financial calculations
  const estimatedCost = calculateInstallationCost(recommendedCapacity, customerType);
  const subsidyAmount = calculateSubsidy(recommendedCapacity, customerType);
  const netCost = estimatedCost - subsidyAmount;

  // Savings calculations
  const savings = calculateSavings(annualUnits, region.avgTariff, netCost);

  // Environmental impact
  const environmental = calculateEnvironmentalImpact(recommendedCapacity, region.solarIrradiance);

  return {
    recommendedCapacity,
    requiredArea,
    estimatedCost,
    subsidyAmount,
    netCost,
    ...savings,
    ...environmental,
    region: region.state,
    avgTariff: region.avgTariff,
    solarIrradiance: region.solarIrradiance,
  };
}
