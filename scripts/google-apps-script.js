/**
 * Google Apps Script - Solar Force Form Handler & Email System
 * 
 * This script receives form submissions, saves them to Google Sheets,
 * and sends email notifications directly (no SMTP server needed).
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
 * 9. Copy the Web App URL and use it in your frontend code
 */

// Configuration
const LEADS_SHEET_NAME = 'Leads';
const CALCULATOR_SHEET_NAME = 'CalculatorResults';
const ADMIN_EMAIL = 'rudransha04@gmail.com'; // Replace with your admin email
const SENDER_NAME = 'SolarForce Team';

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
            message: 'Solar Force Form & Email API is running!',
            timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save a lead to the Leads sheet and send emails
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

    // Send notifications
    try {
        if (ADMIN_EMAIL) {
            sendLeadNotification(data);
        }
        if (data.email) {
            sendThankYouEmail(data);
        }
    } catch (e) {
        // Don't fail the request if email fails
        Logger.log('Email error: ' + e.toString());
    }

    return {
        success: true,
        id: id,
        message: 'Lead saved and emails sent successfully!'
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

    // If contact info is present (saveLead=true was used), send emails
    if (data.saveLead && data.email && data.name) {
        try {
            if (ADMIN_EMAIL) {
                sendLeadNotification(data);
            }
            sendThankYouEmail(data);
        } catch (e) {
            Logger.log('Email error: ' + e.toString());
        }
    }

    return {
        success: true,
        id: id,
        message: 'Calculator result saved successfully!'
    };
}

/**
 * Send lead notification to Admin
 */
function sendLeadNotification(lead) {
    const subject = `🌞 New Solar Lead: ${lead.name} (${lead.city || 'Unknown City'})`;
    const body = `
New Lead Details:
----------------
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
City: ${lead.city}
Customer Type: ${lead.customerType || lead.customer_type}
Monthly Bill: Rs. ${lead.monthlyBill || lead.monthly_bill || 'N/A'}
Message: ${lead.message || 'N/A'}

Source: ${lead.sourcePage || lead.source_page || 'Website'}
Timestamp: ${new Date().toLocaleString()}
    `;

    MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: subject,
        body: body
    });
}

/**
 * Send thank you email to Customer
 */
function sendThankYouEmail(lead) {
    const subject = "Thank you for contacting SolarForce! ☀️";

    // HTML Template
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">SolarForce</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Dear ${lead.name},</p>
            <p>Thank you for your interest in SolarForce! We have received your inquiry.</p>
            <p>Our solar experts will review your details and contact you shortly (usually within 24 hours).</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Your Request Details:</p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    <li>City: ${lead.city}</li>
                    <li>Status: Received</li>
                </ul>
            </div>

            <p>Best regards,<br>The SolarForce Team</p>
        </div>
    </div>
    `;

    MailApp.sendEmail({
        to: lead.email,
        subject: subject,
        htmlBody: htmlBody,
        name: SENDER_NAME
    });
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
