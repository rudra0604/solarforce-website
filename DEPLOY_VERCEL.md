# Deployment Guide for Vercel

This guide explains how to deploy your SolarForce website to Vercel.

## Prerequisites

1.  A Vercel account (https://vercel.com/signup).
2.  Your project pushed to GitHub.

## Steps to Deploy

### 1. Push Your Code to GitHub

First, you need to save all the changes we made and push them to your GitHub repository.

Run these commands in your terminal:

```bash
git add .
git commit -m "Prepare for Vercel deployment: Add Node.js support and config"
git push origin main
```

### 2. Import Project in Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Find your `solarforce-website` repository and click **"Import"**.

### 3. Configure Project Settings

Vercel should automatically detect most settings, but double-check these:

*   **Framework Preset:** `Other` (or sometimes it detects `Vite` or others, but `Other` is safest for Hono).
*   **Root Directory:** `./` (default).
*   **Build Command:** Leave empty (we configured `vercel.json` to handle this).
*   **Output Directory:** Leave empty.
*   **Install Command:** `npm install` (default).

### 4. Add Environment Variables

This is critical! Your app needs these to work correctly.
In the **"Environment Variables"** section, add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `rudransha04@gmail.com` |
| `SMTP_PASS` | `(Your Google App Password)` |
| `ADMIN_EMAIL` | `rudransha04@gmail.com` |
| `GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbxi3hG0_tNpNfmnsDPtraC_8IaDXdihjJ1f_nF_-EDcWwBGe0dZG4RpFsmZYwB5IJtI/exec` |

### 5. Deploy

Click **"Deploy"**.

Vercel will build your project and give you a live URL (e.g., `solarforce-website.vercel.app`).

## Troubleshooting

If the deployment fails, check the "Build Logs" in Vercel. Common issues:
*   **Missing Environment Variables:** Make sure you added all variables.
*   **Type Errors:** Vercel builds strictly. If there are TypeScript errors, you might need to fix them or set `ignoreBuildErrors: true` in `vercel.json` (though we fixed most).

## Custom Domain

Once deployed, go to **Settings** -> **Domains** to add your custom domain (e.g., `solarforce.in`).
