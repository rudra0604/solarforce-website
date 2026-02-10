import { Hono } from 'hono';
import { leadsDB, calculatorResultsDB, type Lead, type CalculatorResult } from '../lib/google-sheets';
import { sendLeadNotification, sendThankYouEmail } from '../lib/email';
import { performCompleteCalculation } from '../lib/calculator';
import { performCICalculation, type CICalculatorInput } from '../lib/ci-calculator';

const apiRoutes = new Hono();

// API endpoints for form submissions and calculations

// Lead submission (universal endpoint for all forms)
apiRoutes.post('/leads', async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    const { name, phone, city, customerType, sourcePage } = body;
    
    if (!name || !phone || !city || !customerType) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Prepare lead data
    const leadData: Lead = {
      name,
      phone,
      email: body.email || null,
      city,
      customer_type: customerType,
      monthly_bill: body.monthlyBill || null,
      rooftop_area: body.rooftopArea || null,
      message: body.message || null,
      source_page: sourcePage || '/',
      status: 'new',
    };
    
    // Save to Google Sheets
    const { data, error } = await leadsDB.insert(leadData);
    
    if (error) {
      console.error('Google Sheets error:', error);
      return c.json({ success: false, error: 'Database error' }, 500);
    }
    
    // Send email notifications asynchronously (don't wait)
    Promise.all([
      sendLeadNotification(leadData),
      sendThankYouEmail(leadData)
    ]).catch(err => console.error('Email notification failed:', err));
    
    return c.json({ 
      success: true, 
      message: 'Thank you! Our team will contact you within 24 hours.',
      referenceId: `SF-${data.id.split('-')[0].toUpperCase()}`
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return c.json({ success: false, error: 'Invalid request' }, 400);
  }
});

// Solar calculator
apiRoutes.post('/calculate', async (c) => {
  try {
    const body = await c.req.json();
    const { monthlyBill, city, customerType, rooftopArea, pincode, saveLead } = body;
    
    if (!monthlyBill || !city || !customerType) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Perform calculation
    const result = performCompleteCalculation(
      parseFloat(monthlyBill),
      city,
      customerType,
      rooftopArea ? parseFloat(rooftopArea) : undefined
    );
    
    // Prepare calculator result for database
    const calculatorData: any = {
      pincode: pincode || null,
      city,
      state: result.region,
      monthly_bill: parseFloat(monthlyBill),
      rooftop_area: rooftopArea ? parseFloat(rooftopArea) : null,
      customer_type: customerType,
      recommended_capacity: result.recommendedCapacity,
      estimated_cost: result.estimatedCost,
      subsidy_amount: result.subsidyAmount,
      net_cost: result.netCost,
      monthly_savings: result.monthlySavings,
      annual_savings: result.annualSavings,
      lifetime_savings: result.lifetimeSavings,
      payback_period: result.paybackPeriod,
      annual_generation: result.annualGeneration,
      co2_offset: result.co2Offset,
      trees_equivalent: result.treesEquivalent,
    };
    
    // Save to database
    const { data: calcData, error: calcError } = await calculatorResultsDB.insert(calculatorData);
    
    if (calcError) {
      console.error('Calculator save error:', calcError);
      // Don't fail the request if database save fails
    }
    
    // If user provides contact info, create a lead
    if (saveLead && body.name && body.phone) {
      const leadData: Lead = {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        city,
        customer_type: customerType,
        monthly_bill: parseFloat(monthlyBill),
        rooftop_area: rooftopArea ? parseFloat(rooftopArea) : null,
        source_page: '/calculator',
        status: 'new',
      };
      
      const { data: leadResult, error: leadError } = await leadsDB.insert(leadData);
      
      if (!leadError && leadResult) {
        // Note: Google Sheets doesn't support linking like SQL, 
        // but we can store the lead_id in the calculator result
        // by re-inserting with the lead_id (or update if you implement update function)
        
        // Send notifications
        Promise.all([
          sendLeadNotification(leadData),
          sendThankYouEmail(leadData)
        ]).catch(err => console.error('Email notification failed:', err));
      }
    }
    
    return c.json({
      success: true,
      calculation: {
        // System specs
        recommendedCapacity: result.recommendedCapacity,
        requiredArea: result.requiredArea,
        
        // Financial
        estimatedCost: result.estimatedCost,
        subsidyAmount: result.subsidyAmount,
        netCost: result.netCost,
        
        // Savings
        monthlySavings: result.monthlySavings,
        annualSavings: result.annualSavings,
        lifetimeSavings: result.lifetimeSavings,
        paybackPeriod: result.paybackPeriod,
        
        // Environmental
        annualGeneration: result.annualGeneration,
        co2Offset: result.co2Offset,
        treesEquivalent: result.treesEquivalent,
        
        // Metadata
        region: result.region,
        avgTariff: result.avgTariff,
      }
    });
  } catch (error) {
    console.error('Calculation error:', error);
    return c.json({ success: false, error: 'Calculation error' }, 400);
  }
});

// Contact form
apiRoutes.post('/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, message, subject, sourcePage } = body;
    
    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Save contact submission as a lead
    const contactLead: Lead = {
      name,
      email,
      phone: phone || 'Not provided',
      city: 'Not specified',
      customer_type: 'residential',
      message,
      source_page: sourcePage || '/contact',
      status: 'new',
    };
    
    const { error } = await leadsDB.insert(contactLead);
    
    if (error) {
      console.error('Contact submission error:', error);
    }
    
    // Also send email notification
    sendLeadNotification(contactLead).catch(err => console.error('Email failed:', err));
    
    return c.json({ 
      success: true, 
      message: 'Message received! We\'ll get back to you soon.'
    });
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request' }, 400);
  }
});

// Newsletter subscription
apiRoutes.post('/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    
    if (!email || !email.includes('@')) {
      return c.json({ success: false, error: 'Invalid email' }, 400);
    }
    
    console.log('Newsletter subscription:', email);
    
    return c.json({ 
      success: true, 
      message: 'Thank you for subscribing!'
    });
  } catch (error) {
    return c.json({ success: false, error: 'Invalid request' }, 400);
  }
});

// Health check
apiRoutes.get('/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ============================================================================
// COMMERCIAL & INDUSTRIAL SOLAR CALCULATOR API
// ============================================================================

/**
 * POST /api/ci-calculate
 * 
 * Comprehensive C&I solar calculator with support for:
 * - CAPEX (self-owned) and OPEX/PPA (third-party) models
 * - IRR, NPV, LCOE calculations
 * - 25-year cashflow projections
 * - Environmental impact metrics
 * 
 * Required fields:
 * - city OR pincode
 * - monthlyConsumption OR monthlyBill
 * - customerSegment: 'industrial' | 'commercial'
 * - ownershipModel: 'capex' | 'opex'
 * - installationType: 'rooftop' | 'ground'
 */
apiRoutes.post('/ci-calculate', async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.city && !body.pincode) {
      return c.json({ success: false, error: 'City or pincode is required' }, 400);
    }
    
    if (!body.monthlyConsumption && !body.monthlyBill) {
      return c.json({ success: false, error: 'Monthly consumption or bill is required' }, 400);
    }
    
    if (!body.customerSegment || !['industrial', 'commercial'].includes(body.customerSegment)) {
      return c.json({ success: false, error: 'Valid customer segment (industrial/commercial) is required' }, 400);
    }
    
    if (!body.ownershipModel || !['capex', 'opex'].includes(body.ownershipModel)) {
      return c.json({ success: false, error: 'Valid ownership model (capex/opex) is required' }, 400);
    }
    
    // Build calculator input
    const input: CICalculatorInput = {
      city: body.city || '',
      pincode: body.pincode,
      monthlyConsumption: body.monthlyConsumption ? parseFloat(body.monthlyConsumption) : undefined,
      monthlyBill: body.monthlyBill ? parseFloat(body.monthlyBill) : undefined,
      avgTariff: body.avgTariff ? parseFloat(body.avgTariff) : undefined,
      customerSegment: body.customerSegment,
      sanctionedLoad: body.sanctionedLoad ? parseFloat(body.sanctionedLoad) : undefined,
      availableArea: body.availableArea ? parseFloat(body.availableArea) : undefined,
      operatingDays: body.operatingDays ? parseInt(body.operatingDays) : undefined,
      installationType: body.installationType || 'rooftop',
      ownershipModel: body.ownershipModel,
      ppaTariff: body.ppaTariff ? parseFloat(body.ppaTariff) : undefined,
      ppaEscalation: body.ppaEscalation ? parseFloat(body.ppaEscalation) : undefined,
      netMeteringPercent: body.netMeteringPercent ? parseFloat(body.netMeteringPercent) : undefined,
      captiveConsumptionPercent: body.captiveConsumptionPercent ? parseFloat(body.captiveConsumptionPercent) : undefined,
      customEpcCost: body.customEpcCost ? parseFloat(body.customEpcCost) : undefined,
      customOmPercent: body.customOmPercent ? parseFloat(body.customOmPercent) : undefined,
      customDegradation: body.customDegradation ? parseFloat(body.customDegradation) : undefined,
      customPR: body.customPR ? parseFloat(body.customPR) : undefined,
      discountRate: body.discountRate ? parseFloat(body.discountRate) : undefined,
      tariffEscalation: body.tariffEscalation ? parseFloat(body.tariffEscalation) : undefined,
    };
    
    // Perform calculation
    const result = performCICalculation(input);
    
    // Optionally save lead if contact info provided
    if (body.saveLead && body.name && body.phone) {
      const leadData: Lead = {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        city: body.city || result.input.region,
        customer_type: body.customerSegment,
        monthly_bill: body.monthlyBill || null,
        rooftop_area: body.availableArea || null,
        message: `C&I Calculator - ${result.system.finalCapacity}kW ${body.ownershipModel.toUpperCase()} - ${body.companyName || 'N/A'}`,
        source_page: '/ci-calculator',
        status: 'new',
      };
      
      // Save lead asynchronously
      leadsDB.insert(leadData).then(({ error }) => {
        if (error) console.error('Lead save error:', error);
      });
      
      // Send notifications asynchronously
      Promise.all([
        sendLeadNotification(leadData),
        sendThankYouEmail(leadData),
      ]).catch(err => console.error('Email error:', err));
    }
    
    return c.json({
      success: true,
      calculation: result,
    });
    
  } catch (error) {
    console.error('C&I calculation error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Calculation failed' 
    }, 500);
  }
});

/**
 * GET /api/ci-regions
 * Returns list of supported regions with solar data
 */
apiRoutes.get('/ci-regions', (c) => {
  const { regionData } = require('../lib/ci-calculator');
  
  const regions = Object.entries(regionData).map(([key, data]: [string, any]) => ({
    id: key,
    name: data.name,
    avgIrradiance: data.avgIrradiance,
    avgTariffIndustrial: data.avgTariffIndustrial,
    avgTariffCommercial: data.avgTariffCommercial,
  }));
  
  return c.json({ success: true, regions });
});

export { apiRoutes };
