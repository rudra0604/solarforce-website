# SolarForce Website - Complete Setup Guide

## ✅ What's Been Implemented

### 1. **Solar Calculator (COMPLETE)**
- ✅ Region-specific calculations (MP, Delhi, NCR)
- ✅ Real-time updates as user adjusts inputs
- ✅ Accurate subsidy calculations (PM Surya Ghar scheme)
- ✅ ROI, payback period, lifetime savings
- ✅ Environmental impact (CO2 offset, trees equivalent)
- ✅ Customer type support (Residential/Commercial/Housing Society)

### 2. **Lead Management System (COMPLETE)**
- ✅ Lead capture from all forms
- ✅ Calculator results saved to Google Sheets
- ✅ Automatic email notifications to admin
- ✅ Thank you emails to customers
- ✅ Google Sheets database integration

### 3. **API Endpoints (COMPLETE)**
- ✅ POST `/api/calculate` - Solar calculator
- ✅ POST `/api/leads` - Lead submission
- ✅ POST `/api/contact` - Contact form
- ✅ GET `/api/health` - Health check

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Configure Google Sheets Database

1. Create a new Google Spreadsheet
2. Set up a Google Cloud project and enable Sheets API
3. Create a service account and generate API key
4. Share the spreadsheet with the service account email

### Step 2: Configure Email Notifications

**Option A: Gmail (Recommended - Easiest)**
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Create new app password:
   - App: "Mail"
   - Device: "Other (Custom name)" → "SolarForce"
3. Copy the 16-character password

**Option B: Other SMTP providers**
- SendGrid, Mailgun, AWS SES, etc.

### Step 3: Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in:
   ```
   # Google Sheets (from Step 1)
   GOOGLE_SHEETS_API_KEY=your_api_key
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   
   # Email (from Step 2)
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_char_app_password
   ADMIN_EMAIL=admin@solarforce.in
   
   # Site
   SITE_URL=https://solarforce.in
   ```

### Step 4: Start the Server

```bash
# Install dependencies (if not done)
bun install

# Start development server
bun run dev

# Or production
bun run start
```

Visit: http://localhost:3001/calculator

---

## 🧪 Testing

### Test Calculator
1. Go to `/calculator`
2. Adjust monthly bill slider
3. Change city (try: Delhi, Indore, Gwalior)
4. Click "Update Calculation"
5. Check console for API responses

### Test Lead Submission
```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9876543210",
    "email": "test@example.com",
    "city": "Delhi",
    "customerType": "residential",
    "monthlyBill": 4000,
    "sourcePage": "/calculator"
  }'
```

### Check Database
- Open your Google Spreadsheet
- Check the leads sheet for new entries
- Check calculator_results sheet

### Check Emails
- Admin should receive notification email
- Customer should receive thank you email (if email provided)

---

## 📊 How It Works

### Solar Calculator Flow

```
User Input (Bill, City, Type)
        ↓
GET region data (tariff, irradiance)
        ↓
CALCULATE system size, cost, savings
        ↓
SAVE to Google Sheets
        ↓
DISPLAY results in real-time
        ↓
[User clicks "Get Detailed Quote"]
        ↓
CAPTURE contact info
        ↓
CREATE lead in database
        ↓
SEND email notifications
```

### Lead Capture Flow

```
User fills form
        ↓
POST /api/leads
        ↓
VALIDATE data
        ↓
SAVE to Google Sheets
        ↓
SEND admin notification email
        ↓
SEND customer thank you email
        ↓
RETURN success message
```

---

## 🎯 Calculator Features

### Region-Specific Calculations
- **Madhya Pradesh**: 7.5 Rs/kWh, 5.5 kWh/m²/day irradiance
- **Delhi**: 8.5 Rs/kWh, 5.2 kWh/m²/day irradiance
- **Haryana (Gurugram)**: 7.8 Rs/kWh, 5.3 kWh/m²/day
- **Default (India)**: 8.0 Rs/kWh, 5.0 kWh/m²/day

### Subsidy Calculation (PM Surya Ghar)
- Up to 1 kW: ₹30,000
- Up to 2 kW: ₹60,000
- Up to 3 kW+: ₹78,000
- Commercial: No subsidy

### Cost per kW
- Residential: ₹65,000/kW
- Commercial: ₹55,000/kW
- Housing Society: ₹58,000/kW

### Environmental Impact
- CO2 offset: 0.82 kg per kWh generated
- Trees equivalent: 1 tree = 20 kg CO2/year

---

## 📧 Email Templates

### Admin Notification
- **Subject**: "🌞 New [Type] Lead: [Name] - [City]"
- **Content**: Complete lead details with contact info, bill, area
- **Design**: Professional HTML email with SolarForce branding

### Customer Thank You
- **Subject**: "Thank You for Your Interest in Solar Solutions! 🌞"
- **Content**: Next steps, what to expect, contact info
- **Design**: Branded HTML with CTA buttons

---

## 🛠️ File Structure

```
solar-main/
├── src/
│   ├── lib/
│   │   ├── google-sheets.ts  # Database client & types
│   │   ├── email.ts          # Email notification functions
│   │   └── calculator.ts     # Calculator logic & formulas
│   ├── routes/
│   │   └── api.ts            # All API endpoints
│   ├── views/
│   │   └── calculator.html   # Calculator UI
│   └── server.ts             # Main server
├── public/
│   └── js/
│       └── calculator.js     # Frontend calculator logic
├── .env                      # Your configuration (DO NOT COMMIT)
└── .env.example              # Example configuration
```

---

## 🚢 Deployment Options

### Option 1: VPS/Cloud Server (Recommended)
```bash
# Install dependencies
bun install

# Start production server
bun run start
```

### Option 2: Railway (Easy - $5/month)
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform ($5-12/month)
1. Create new app
2. Connect GitHub
3. Add environment variables
4. Deploy

---

## 📝 Client Delivery Checklist

### Code
- ✅ Complete source code
- ✅ Working calculator with real calculations
- ✅ Lead management system
- ✅ Email notifications
- ✅ Google Sheets integration

### Documentation
- ✅ This setup guide
- ✅ Environment configuration examples
- ✅ API documentation

### Configuration
- ✅ .env.example with all variables
- ✅ Email templates

### Testing
- ✅ Calculator tested with multiple regions
- ✅ Lead submission tested
- ✅ Email notifications tested
- ✅ Database integration verified

---

## 🔐 Security Notes

### Production Checklist
1. ✅ Use HTTPS
2. ✅ Keep .env file out of Git (.gitignore)
3. ✅ Use app-specific passwords for email
4. ✅ Set up CORS properly
5. ✅ Rate limit API endpoints (optional)

---

## 📞 Support & Maintenance

### Common Issues

**Q: Email notifications not working?**
- Check SMTP credentials in .env
- Use Gmail App Password (not regular password)
- Check spam folder

**Q: Calculator not updating?**
- Check browser console for errors
- Verify API endpoint is accessible
- Check Google Sheets connection

**Q: Database errors?**
- Verify Google Sheets credentials
- Check if spreadsheet is shared with service account
- Ensure API is enabled in Google Cloud

### Maintenance Tasks
- **Weekly**: Check lead database for new entries
- **Monthly**: Backup Google Sheets data
- **Quarterly**: Update region tariff rates if changed
- **Yearly**: Review and update calculator formulas

---

## 🎉 Success!

Your SolarForce website is now complete with:
- ✨ Functional solar calculator
- 📧 Automatic lead notifications
- 💾 Google Sheets storage
- 📊 Detailed calculations
- 🌱 Environmental impact tracking

**Next Steps:**
1. Set up Google Sheets (5 min)
2. Configure email (2 min)
3. Deploy to production (10 min)
4. Start receiving leads! 🚀

---

**Questions?** Check the inline code comments or reach out for support.

**Made with ☀️ by SolarForce**
