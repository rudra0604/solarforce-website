import nodemailer from 'nodemailer';
import type { Lead } from './google-sheets';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Check if email is configured
export const isEmailConfigured = () => {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
};

// Send new lead notification to admin
export async function sendLeadNotification(lead: Lead) {
  if (!isEmailConfigured()) {
    console.log('⚠️  Email not configured. Lead notification skipped.');
    return { success: false, message: 'Email not configured' };
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #0052CC; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
        .badge-residential { background: #d4edda; color: #155724; }
        .badge-commercial { background: #cce5ff; color: #004085; }
        .badge-society { background: #fff3cd; color: #856404; }
        .footer { margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">🌞 New Solar Lead Received!</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">SolarForce Lead Notification</p>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">Customer Name:</span><br>
            <span style="font-size: 18px;">${lead.name}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Contact Information:</span><br>
            📞 ${lead.phone}<br>
            ${lead.email ? `✉️ ${lead.email}` : ''}
          </div>
          
          <div class="info-row">
            <span class="label">Location:</span><br>
            📍 ${lead.city}${lead.pincode ? ` - ${lead.pincode}` : ''}
          </div>
          
          <div class="info-row">
            <span class="label">Customer Type:</span><br>
            <span class="badge badge-${lead.customer_type}">${lead.customer_type.toUpperCase()}</span>
          </div>
          
          ${lead.monthly_bill ? `
          <div class="info-row">
            <span class="label">Monthly Electricity Bill:</span><br>
            💰 ₹${lead.monthly_bill.toLocaleString()}
          </div>
          ` : ''}
          
          ${lead.rooftop_area ? `
          <div class="info-row">
            <span class="label">Available Rooftop Area:</span><br>
            📐 ${lead.rooftop_area} sq.ft
          </div>
          ` : ''}
          
          ${lead.message ? `
          <div class="info-row">
            <span class="label">Message:</span><br>
            ${lead.message}
          </div>
          ` : ''}
          
          <div class="info-row">
            <span class="label">Lead Source:</span><br>
            🔗 ${lead.source_page}
          </div>
          
          <div class="info-row">
            <span class="label">Timestamp:</span><br>
            🕐 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
        </div>
        
        <div class="footer">
          <strong>⚡ Action Required:</strong> Please follow up with this lead within 24 hours for best conversion rates.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"SolarForce Leads" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🌞 New ${lead.customer_type} Lead: ${lead.name} - ${lead.city}`,
      html: htmlContent,
      text: `
New Solar Lead Received!

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email || 'Not provided'}
City: ${lead.city}
Customer Type: ${lead.customer_type}
Monthly Bill: ${lead.monthly_bill ? '₹' + lead.monthly_bill : 'Not provided'}
Rooftop Area: ${lead.rooftop_area ? lead.rooftop_area + ' sq.ft' : 'Not provided'}
Message: ${lead.message || 'No message'}
Source: ${lead.source_page}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please follow up within 24 hours.
      `,
    });

    console.log('✅ Lead notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error };
  }
}

// Send thank you email to customer
export async function sendThankYouEmail(lead: Lead) {
  if (!isEmailConfigured() || !lead.email) {
    return { success: false, message: 'Email not configured or no customer email' };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0052CC 0%, #0066FF 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: white; padding: 30px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px; }
        .cta-button { display: inline-block; background: #0052CC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; font-size: 14px; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">☀️ Thank You ${lead.name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.95;">Your solar journey starts here</p>
        </div>
        <div class="content">
          <p>Dear ${lead.name},</p>
          
          <p>Thank you for your interest in SolarForce solar solutions! We've received your inquiry and our solar experts are excited to help you make the switch to clean, renewable energy.</p>
          
          <p><strong>What happens next?</strong></p>
          <ol>
            <li>Our team will review your requirements</li>
            <li>We'll contact you within 24 hours</li>
            <li>Schedule a free site visit at your convenience</li>
            <li>Receive a customized solar solution proposal</li>
          </ol>
          
          <p>In the meantime, feel free to explore our solutions:</p>
          
          <div style="text-align: center;">
            <a href="${process.env.SITE_URL || 'http://localhost:3001'}/calculator" class="cta-button">Calculate Your Savings</a>
          </div>
          
          <p>Have questions? Reply to this email or call us at <strong>+91 XXXXX XXXXX</strong></p>
          
          <p>Best regards,<br>
          <strong>Team SolarForce</strong><br>
          Powering a Sustainable Future</p>
        </div>
        
        <div class="footer">
          <p style="margin: 0;"><strong>SolarForce Solar</strong></p>
          <p style="margin: 5px 0;">Family-owned solar energy company | 5+ years experience | 30+ installations</p>
          <p style="margin: 5px 0;">Madhya Pradesh & New Delhi</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"SolarForce Team" <${process.env.SMTP_USER}>`,
      to: lead.email,
      subject: 'Thank You for Your Interest in Solar Solutions! 🌞',
      html: htmlContent,
      text: `
Dear ${lead.name},

Thank you for your interest in SolarForce solar solutions! We've received your inquiry and our solar experts are excited to help you make the switch to clean, renewable energy.

What happens next?
1. Our team will review your requirements
2. We'll contact you within 24 hours
3. Schedule a free site visit at your convenience
4. Receive a customized solar solution proposal

Have questions? Reply to this email or call us at +91 XXXXX XXXXX

Best regards,
Team SolarForce
Powering a Sustainable Future
      `,
    });

    console.log('✅ Thank you email sent to customer:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Customer email sending failed:', error);
    return { success: false, error };
  }
}
