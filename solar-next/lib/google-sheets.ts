/**
 * Google Sheets Database Service
 * Uses Google Apps Script as the backend for form submissions
 */

export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email?: string;
  phone: string;
  pincode?: string;
  city: string;
  customer_type: 'residential' | 'commercial' | 'housing-society';
  monthly_bill?: number;
  rooftop_area?: number;
  message?: string;
  source_page: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
}

export interface CalculatorResult {
  id?: string;
  created_at?: string;
  pincode?: string;
  city?: string;
  state?: string;
  monthly_bill: number;
  rooftop_area?: number;
  customer_type: 'residential' | 'commercial' | 'housing-society';
  recommended_capacity: number;
  estimated_cost: number;
  subsidy_amount: number;
  net_cost: number;
  monthly_savings: number;
  annual_savings: number;
  lifetime_savings: number;
  payback_period: number;
  annual_generation: number;
  co2_offset: number;
  trees_equivalent: number;
  lead_id?: string;
}

// Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';

// Check if Google Apps Script is configured
const isGoogleSheetsConfigured = GOOGLE_APPS_SCRIPT_URL &&
  !GOOGLE_APPS_SCRIPT_URL.includes('placeholder') &&
  GOOGLE_APPS_SCRIPT_URL.startsWith('https://script.google.com');

if (!isGoogleSheetsConfigured) {
  console.warn('⚠️  Google Apps Script not configured. Database features will be disabled.');
  console.warn('⚠️  To enable database, configure GOOGLE_APPS_SCRIPT_URL in .env');
} else {
  console.log('✅ Google Sheets connected via Apps Script');
}

/**
 * Send data to Google Apps Script
 */
async function sendToAppsScript(action: string, data: any): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!isGoogleSheetsConfigured) {
    console.warn('⚠️  Skipping save - Google Apps Script not configured');
    return { success: false, error: 'Google Apps Script not configured' };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        ...data,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apps Script error:', errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Apps Script request failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Database service for Leads
 */
export const leadsDB = {
  async insert(lead: Lead): Promise<{ data: Lead | null, error: any }> {
    const result = await sendToAppsScript('lead', {
      name: lead.name,
      email: lead.email || '',
      phone: lead.phone,
      city: lead.city,
      customerType: lead.customer_type,
      pincode: lead.pincode || '',
      monthlyBill: lead.monthly_bill?.toString() || '',
      rooftopArea: lead.rooftop_area?.toString() || '',
      message: lead.message || '',
      sourcePage: lead.source_page,
      status: lead.status || 'new',
      notes: lead.notes || '',
    });

    if (!result.success) {
      return { data: null, error: new Error(result.error || 'Failed to save lead') };
    }

    return {
      data: {
        ...lead,
        id: result.id,
        created_at: new Date().toISOString()
      },
      error: null
    };
  },

  async getAll(): Promise<{ data: Lead[] | null, error: any }> {
    // Note: Reading data requires a different Apps Script endpoint
    // For now, return empty array (admin dashboard can be added later)
    console.warn('⚠️  getAll not implemented for Apps Script method');
    return { data: [], error: null };
  },
};

/**
 * Database service for Calculator Results
 */
export const calculatorResultsDB = {
  async insert(result: CalculatorResult): Promise<{ data: CalculatorResult | null, error: any }> {
    const apiResult = await sendToAppsScript('calculator', {
      pincode: result.pincode,
      city: result.city,
      state: result.state,
      monthlyBill: result.monthly_bill,
      rooftopArea: result.rooftop_area,
      customerType: result.customer_type,
      recommendedCapacity: result.recommended_capacity,
      estimatedCost: result.estimated_cost,
      subsidyAmount: result.subsidy_amount,
      netCost: result.net_cost,
      monthlySavings: result.monthly_savings,
      annualSavings: result.annual_savings,
      lifetimeSavings: result.lifetime_savings,
      paybackPeriod: result.payback_period,
      annualGeneration: result.annual_generation,
      co2Offset: result.co2_offset,
      treesEquivalent: result.trees_equivalent,
      leadId: result.lead_id || '',
    });

    if (!apiResult.success) {
      return { data: null, error: new Error(apiResult.error || 'Failed to save calculator result') };
    }

    return {
      data: {
        ...result,
        id: apiResult.id,
        created_at: new Date().toISOString()
      },
      error: null
    };
  },

  async getAll(): Promise<{ data: CalculatorResult[] | null, error: any }> {
    // Note: Reading data requires a different Apps Script endpoint
    console.warn('⚠️  getAll not implemented for Apps Script method');
    return { data: [], error: null };
  },
};

export { isGoogleSheetsConfigured };
