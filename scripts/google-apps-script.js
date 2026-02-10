/**
 * Google Apps Script - Solar Force Form Handler
 * 
 * This script receives form submissions from your website
 * and saves them to your Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your Google Sheet, go to Extensions → Apps Script
 * 2. Delete all existing code and paste this entire script
 * 3. Click Save (Ctrl+S or Cmd+S)
 * 4. Click Deploy → New deployment
 * 5. Choose "Web app" as the type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and authorize when prompted
 * 9. Copy the Web App URL and add it to your .env file
 */

// Configuration - Sheet name where leads are saved
const LEADS_SHEET_NAME = 'Leads';
const CALCULATOR_SHEET_NAME = 'CalculatorResults';

/**
 * Handle POST requests from the website
 */
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const action = data.action || 'lead';

        let result;

        if (action === 'calculator') {
            result = saveCalculatorResult(data);
        } else {
            result = saveLead(data);
        }

        return ContentService
            .createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                error: error.message
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            success: true,
            message: 'Solar Force Form API is running!',
            timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save a lead to the Leads sheet
 */
function saveLead(data) {
    const sheet = getOrCreateSheet(LEADS_SHEET_NAME, [
        'ID', 'Timestamp', 'Name', 'Email', 'Phone', 'City',
        'Customer Type', 'Monthly Bill', 'Rooftop Area', 'Message',
        'Source Page', 'Pincode', 'Status', 'Notes'
    ]);

    const id = generateId();
    const timestamp = new Date().toISOString();

    // Prefix phone with single quote to prevent formula interpretation
    const phone = (data.phone || '').toString();
    const safePhone = phone.startsWith('+') ? "'" + phone : phone;

    const row = [
        id,
        timestamp,
        data.name || '',
        data.email || '',
        safePhone,
        data.city || '',
        data.customerType || data.customer_type || '',
        data.monthlyBill || data.monthly_bill || '',
        data.rooftopArea || data.rooftop_area || '',
        data.message || '',
        data.sourcePage || data.source_page || '',
        data.pincode || '',
        data.status || 'new',
        data.notes || ''
    ];

    sheet.appendRow(row);

    return {
        success: true,
        id: id,
        message: 'Lead saved successfully!'
    };
}

/**
 * Save calculator results to the CalculatorResults sheet
 */
function saveCalculatorResult(data) {
    const sheet = getOrCreateSheet(CALCULATOR_SHEET_NAME, [
        'ID', 'Timestamp', 'Pincode', 'City', 'State', 'Monthly Bill',
        'Rooftop Area', 'Customer Type', 'Recommended Capacity',
        'Estimated Cost', 'Subsidy Amount', 'Net Cost', 'Monthly Savings',
        'Annual Savings', 'Lifetime Savings', 'Payback Period',
        'Annual Generation', 'CO2 Offset', 'Trees Equivalent', 'Lead ID'
    ]);

    const id = generateId();
    const timestamp = new Date().toISOString();

    const row = [
        id,
        timestamp,
        data.pincode || '',
        data.city || '',
        data.state || '',
        data.monthly_bill || data.monthlyBill || '',
        data.rooftop_area || data.rooftopArea || '',
        data.customer_type || data.customerType || '',
        data.recommended_capacity || data.recommendedCapacity || '',
        data.estimated_cost || data.estimatedCost || '',
        data.subsidy_amount || data.subsidyAmount || '',
        data.net_cost || data.netCost || '',
        data.monthly_savings || data.monthlySavings || '',
        data.annual_savings || data.annualSavings || '',
        data.lifetime_savings || data.lifetimeSavings || '',
        data.payback_period || data.paybackPeriod || '',
        data.annual_generation || data.annualGeneration || '',
        data.co2_offset || data.co2Offset || '',
        data.trees_equivalent || data.treesEquivalent || '',
        data.lead_id || data.leadId || ''
    ];

    sheet.appendRow(row);

    return {
        success: true,
        id: id,
        message: 'Calculator result saved successfully!'
    };
}

/**
 * Get or create a sheet with headers
 */
function getOrCreateSheet(sheetName, headers) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
        // Create the sheet if it doesn't exist
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(headers);

        // Format header row
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#4285f4');
        headerRange.setFontColor('#ffffff');

        // Freeze header row
        sheet.setFrozenRows(1);
    }

    return sheet;
}

/**
 * Generate a unique ID
 */
function generateId() {
    return Utilities.getUuid().split('-')[0].toUpperCase();
}

/**
 * Test function - run this to verify the script works
 */
function testSaveLead() {
    const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        city: 'Delhi',
        customerType: 'residential',
        monthlyBill: '3500',
        sourcePage: '/test'
    };

    const result = saveLead(testData);
    Logger.log(result);
}
