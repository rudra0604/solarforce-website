
# ☀️ SolarForce (Next.js Version)

This is the **Next.js** migration of the SolarForce website. It replaces the original Hono + HTML setup with a modern React framework using the App Router.

## 🚀 Getting Started

1.  Navigate to this folder:
    ```bash
    cd solar-next
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

*   **`app/`** - Pages and Routing (App Router)
    *   `page.tsx` - Homepage (/)
    *   `about-us/page.tsx` - About Us (/about-us)
    *   `contact/page.tsx` - Contact Us (/contact)
    *   `go-solar/page.tsx` - Lead Capture Form (/go-solar)
    *   `calculator/page.tsx` - Residential Solar Calculator (/calculator)
    *   `thank-you/page.tsx` - Success Page (/thank-you)
    *   `api/leads/route.ts` - Leads API Endpoint
*   **`components/`** - Reusable React components
    *   `Navbar.tsx`, `Footer.tsx` - Layout components
    *   `SolarQuoteForm.tsx` - Client-side form logic
    *   `SolarCalculator.tsx` - Interactive calculator logic
*   **`lib/`** - Shared logic
    *   `google-sheets.ts` - Database integration
    *   `email.ts` - Nodemailer setup
    *   `pincodes.ts` - Location database for calculator

## 🔑 Environment Variables

Create a `.env` file in the `solar-next` directory with the following keys for full functionality:

```env
# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@solarforce.com

# Google Sheets Backend
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/your-script-id/exec

# Site URL (for email links)
SITE_URL=https://your-domain.com
```

## 📦 Deployment (Vercel)

This project is **Vercel-native**. To deploy:

1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  **Important:** Set the **Root Directory** to `solar-next`.
4.  Add the environment variables listed above in the Vercel dashboard.
5.  Deploy!
