#!/bin/bash

# 🚀 Quick Deployment Script for SolarForce Website

echo "☀️  SolarForce Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - SolarForce website"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Build the static site
echo ""
echo "🔨 Building static site..."
bun run build:static

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

# Check dist folder size
echo ""
echo "📊 Build Statistics:"
du -sh dist
echo ""

# Deployment options
echo "🌐 Deployment Options:"
echo ""
echo "1️⃣  NETLIFY DEPLOYMENT (For Client Preview)"
echo "   → Push your code to GitHub first:"
echo "     git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git"
echo "     git push -u origin main"
echo "   → Then go to netlify.com and import your repository"
echo "   → Build command: bun install && bun run build:static"
echo "   → Publish directory: dist"
echo ""
echo "2️⃣  HOSTINGER DEPLOYMENT (Production)"
echo "   → Upload contents of 'dist' folder to public_html"
echo "   → Use FTP, File Manager, or SSH"
echo "   → Also upload .htaccess file to public_html"
echo ""
echo "📁 Your static files are ready in the 'dist' folder"
echo ""
echo "Need help? Check DEPLOYMENT.md for detailed instructions"
