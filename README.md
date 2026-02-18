# ☀️ SolarForce - Solar Solutions Website

Premium solar solutions website with calculators, lead management, and location-based pages.

## 🚀 Quick Start (Node.js)

You can run this project using **Node.js** (v18+) or **Bun**.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for Node.js (Hostinger/VPS)
npm run build:node

# Start Node.js production server
npm run start:node
```

Visit: http://localhost:3000

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
│   │   ├── componentInjector.ts # Injects navbar/footer (Server-side)
│   │   └── fileReader.ts        # Cross-platform file reader
│   │
│   ├── views/                    # HTML pages
│   │   ├── index.html           # Homepage
│   │   ├── calculator.html      # Residential calculator UI
│   │   ├── ci-calculator.html   # C&I calculator UI
│   │   ├── go-solar.html        # Quote form
│   │   ├── offer/               # Offer pages
│   │   ├── locations/           # City-specific pages
│   │   ├── solutions/           # Solution type pages
│   │   └── legal/               # Legal pages
│   │
│   ├── index.node.ts             # Node.js entry point (Hostinger)
│   └── server.ts                 # Main Hono server logic
│
├── api/                          # Vercel Serverless Function entry point
├── public/                       # Static assets (images, js, css)
├── scripts/                      # Utility scripts
├── dist/                         # Build output
│
├── .env.example                  # Environment template
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── vercel.json                   # Vercel configuration
├── DEPLOY_VERCEL.md              # Vercel deployment guide
└── README.md                     # This file
```

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev Server | `npm run dev` | Start with hot reload (uses Bun locally) |
| Build (Node) | `npm run build:node` | Bundle for Node.js production |
| Start (Node) | `npm run start:node` | Start built Node.js server |
| Build Static | `npm run build:static` | Generate static HTML files |

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```env
# Server
PORT=3000   # Node.js default
NODE_ENV=production

# Google Sheets Database
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Email Notifications (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@solarforce.in

# Site URL
SITE_URL=https://your-domain.com
```

## 🚀 Deployment

### Option 1: Vercel (Recommended for Free Hosting)
This project is configured for Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. Add Environment Variables.
4. Deploy!

See [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) for details.

### Option 2: Hostinger / VPS (Node.js)
1. Run `npm run build:node` locally.
2. Upload `dist/index.node.js` and `package.json` to your server.
3. Set startup command: `node index.node.js`.
4. Ensure environment variables are set.

## 🛡️ Tech Stack

- **Runtime**: Node.js & Bun (Cross-compatible)
- **Framework**: Hono
- **Database**: Google Sheets (via Apps Script)
- **Email**: Nodemailer (Gmail SMTP)
- **Styling**: TailwindCSS / Vanilla CSS
- **Language**: TypeScript

---

**Made with ☀️ by SolarForce**
