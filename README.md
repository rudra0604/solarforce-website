# ☀️ SolarForce - Solar Solutions Website

Premium solar solutions website with calculators, lead management, and location-based pages.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build static files
bun run build:static
```

Visit: http://localhost:3001

## 📁 Project Structure

```
solar-main/
├── src/                          # Source code
│   ├── components/               # Reusable HTML components
│   │   ├── navbar.html          # Navigation bar
│   │   └── footer.html          # Footer
│   │
│   ├── lib/                      # Backend utilities
│   │   ├── google-sheets.ts     # Google Sheets database
│   │   ├── email.ts             # Email notifications
│   │   ├── calculator.ts        # Residential calculator logic
│   │   └── ci-calculator.ts     # Commercial/Industrial calculator
│   │
│   ├── routes/                   # API & page routes
│   │   ├── api.ts               # REST API endpoints
│   │   ├── home.ts              # Home & offer page routes
│   │   ├── pages.ts             # Static pages routes
│   │   ├── locations.ts         # Location page routes
│   │   └── solutions.ts         # Solutions page routes
│   │
│   ├── utils/                    # Helper utilities
│   │   └── componentInjector.ts # Injects navbar/footer
│   │
│   ├── views/                    # HTML pages
│   │   ├── index.html           # Homepage
│   │   ├── calculator.html      # Residential calculator
│   │   ├── ci-calculator.html   # C&I calculator
│   │   ├── go-solar.html        # Quote form
│   │   ├── about.html           # About page
│   │   ├── contact.html         # Contact page
│   │   ├── sitemap.html         # Sitemap
│   │   ├── thank-you.html       # Thank you page
│   │   ├── 404.html             # Error page
│   │   │
│   │   ├── offer/               # Offer pages
│   │   │   ├── residential.html
│   │   │   ├── commercial.html
│   │   │   └── housing-society.html
│   │   │
│   │   ├── locations/           # City-specific pages
│   │   │   ├── delhi.html
│   │   │   ├── gurugram.html
│   │   │   ├── ncr.html
│   │   │   ├── gwalior.html
│   │   │   ├── indore.html
│   │   │   └── Bhind.html
│   │   │
│   │   ├── solutions/           # Solution type pages
│   │   │   ├── on-grid.html
│   │   │   ├── off-grid.html
│   │   │   └── hybrid.html
│   │   │
│   │   └── legal/               # Legal pages
│   │       ├── privacy-policy.html
│   │       └── terms-of-use.html
│   │
│   └── server.ts                 # Main Hono server
│
├── public/                       # Static assets
│   ├── js/                       # Client-side JavaScript
│   │   ├── calculator.js        # Residential calculator UI
│   │   ├── ci-calculator.js     # C&I calculator UI
│   │   ├── navbar-scroll.js     # Navbar scroll effects
│   │   └── scroll-animations.js # Page animations
│   │
│   ├── img/                      # Images
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
│
├── scripts/                      # Build & utility scripts
│   ├── build-static.ts          # Static site generator
│   ├── cleanHTML.ts             # HTML minifier
│   └── google-apps-script.js    # Google Sheets script
│
├── dist/                         # Build output (generated)
│
├── .env.example                  # Environment template
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── SETUP_GUIDE.md               # Detailed setup instructions
└── README.md                     # This file
```

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev Server | `bun run dev` | Start with hot reload |
| Production | `bun run start` | Start production server |
| Build Static | `bun run build:static` | Generate static HTML files |
| Generate Sitemap | `bun run generate-sitemap` | Update sitemap.xml |

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=3001
NODE_ENV=development

# Google Sheets Database
GOOGLE_SHEETS_API_KEY=your_api_key
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id

# Email Notifications (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@solarforce.in

# Site URL
SITE_URL=http://localhost:3001
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/leads` | POST | Submit lead form |
| `/api/contact` | POST | Submit contact form |
| `/api/calculate` | POST | Residential calculator |
| `/api/ci-calculate` | POST | C&I calculator |
| `/api/health` | GET | Health check |

## 🌐 Pages

### Main Pages
- `/` - Homepage
- `/go-solar` - Quote request form
- `/calculator` - Residential solar calculator
- `/ci-calculator` - Commercial/Industrial calculator
- `/about` - About us
- `/contact` - Contact page
- `/sitemap` - Site map

### Offer Pages
- `/residential` - Residential solar
- `/commercial` - Commercial solar
- `/housing-society` - Society solar

### Location Pages
- `/rooftop-solar-in-delhi`
- `/rooftop-solar-in-gurugram`
- `/rooftop-solar-in-ncr`
- `/rooftop-solar-in-gwalior`
- `/rooftop-solar-in-indore`

### Solution Pages
- `/on-grid` - Grid-tied systems
- `/off-grid` - Off-grid systems
- `/hybrid` - Hybrid systems

## 📖 Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

## 🛡️ Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **Database**: Google Sheets
- **Email**: Nodemailer (Gmail SMTP)
- **Styling**: TailwindCSS
- **Language**: TypeScript

---

**Made with ☀️ by SolarForce**
