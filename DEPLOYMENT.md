# 🚀 Deployment Guide

This guide covers deploying the SolarForce website to Netlify (for client preview) and Hostinger (production).

## 📋 Prerequisites

- Git repository (push your code to GitHub/GitLab)
- Netlify account (free tier works)
- Hostinger account with domain access (for production)

---

## 🌐 Netlify Deployment (Client Preview)

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done)**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Run:
     ```bash
     git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
     git branch -M main
     git push -u origin main
     ```

### Step 2: Deploy to Netlify

**Option A: Via Netlify UI (Recommended)**

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab)
4. Select your repository
5. Configure build settings:
   - **Build command**: `bun install && bun run build:static`
   - **Publish directory**: `dist`
   - The `netlify.toml` file will handle the rest
6. Click "Deploy site"
7. Your site will be live at: `https://random-name-12345.netlify.app`

**Option B: Via Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project root
netlify deploy --prod
```

### Step 3: Custom Domain on Netlify (Optional)

1. In Netlify dashboard, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Follow instructions to update DNS settings

### Step 4: Share with Client

Send your client the Netlify URL (e.g., `https://your-site.netlify.app`)

---

## 🏢 Hostinger Deployment (Production)

### Step 1: Build Locally

```bash
# Build static files
bun run build:static

# This creates a 'dist' folder with all your static files
```

### Step 2: Prepare for Upload

The `dist` folder now contains:
- All HTML files
- All assets from `public/` (images, CSS, JS)
- Fully processed and production-ready

### Step 3: Upload to Hostinger

**Via File Manager:**
1. Log in to Hostinger control panel
2. Go to "File Manager"
3. Navigate to `public_html` (or your domain's root folder)
4. Delete default files (index.html, etc.)
5. Upload all contents from your `dist` folder

**Via FTP (Recommended for larger sites):**
1. Get FTP credentials from Hostinger
2. Use FileZilla or similar FTP client
3. Connect to your hosting
4. Navigate to `public_html`
5. Upload all files from `dist` folder

**Via SSH (Advanced):**
```bash
# Connect to Hostinger via SSH
ssh your-username@your-domain.com

# Navigate to public_html
cd public_html

# Use git to pull and build
git clone YOUR-REPO-URL .
bun install
bun run build:static
mv dist/* .
```

### Step 4: Configure Domain

1. In Hostinger panel, ensure your domain points to `public_html`
2. SSL certificate should auto-install
3. Test your site at your domain

### Step 5: Update DNS (if needed)

If using external DNS:
- **A Record**: Point to Hostinger IP
- **WWW CNAME**: Point to your domain

---

## 🔄 Making Updates

### For Netlify:
Just push to your Git repository - auto-deploys!
```bash
git add .
git commit -m "Update content"
git push
```

### For Hostinger:
1. Build locally: `bun run build:static`
2. Upload `dist` folder contents via FTP/File Manager
3. Or use automated deployment tools

---

## ✅ Checklist Before Going Live

- [ ] All forms tested (contact, go-solar, calculators)
- [ ] All links working
- [ ] Images loading correctly
- [ ] Mobile responsive
- [ ] Browser compatibility tested
- [ ] SSL certificate active
- [ ] Google Sheets integration working
- [ ] Email notifications working
- [ ] Analytics/tracking installed (if needed)
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt configured

---

## 🐛 Troubleshooting

### Build Fails on Netlify
- Check build logs in Netlify dashboard
- Ensure `netlify.toml` is committed
- Verify all dependencies in `package.json`

### Images Not Loading
- Check file paths (should be relative: `/img/...`)
- Ensure images are in `public/img/` folder

### Forms Not Working
- Verify Google Sheets API credentials
- Check environment variables in Netlify
- Test email configuration

### 404 Errors
- Ensure `netlify.toml` has redirect rules
- For Hostinger, may need `.htaccess` configuration

---

## 📞 Support

For deployment issues:
- Netlify: Check [docs.netlify.com](https://docs.netlify.com)
- Hostinger: Contact their support team
