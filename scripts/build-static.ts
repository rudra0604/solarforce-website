import { processHTML } from '../src/utils/componentInjector';
import * as fs from 'fs';
import * as path from 'path';

const viewsDir = './src/views';
const outputDir = './dist';

// Define all routes and their corresponding files
const routes = [
  // Core Pages
  { path: 'index.html', file: 'index.html' },
  { path: 'about-us.html', file: 'about.html' },
  { path: 'contact.html', file: 'contact.html' },
  { path: 'calculator.html', file: 'calculator.html' },
  { path: 'ci-calculator.html', file: 'ci-calculator.html' },
  { path: 'go-solar.html', file: 'go-solar.html' },
  { path: 'thank-you.html', file: 'thank-you.html' },
  { path: 'sitemap.html', file: 'sitemap.html' },
  { path: '404.html', file: '404.html' },

  // Offer Pages (mapped to navbar links)
  { path: 'homes.html', file: 'offer/residential.html' },
  { path: 'housing-society.html', file: 'offer/housing-society.html' },
  { path: 'commercial.html', file: 'offer/commercial.html' },

  // Solution Pages (mapped to navbar links)
  { path: 'on-grid-solar-system.html', file: 'solutions/on-grid.html' },
  { path: 'off-grid-solar-system.html', file: 'solutions/off-grid.html' },
  { path: 'hybrid-solar-system.html', file: 'solutions/hybrid.html' },

  // Location Pages (mapped to navbar links)
  { path: 'rooftop-solar-in-delhi.html', file: 'locations/delhi.html' },
  { path: 'rooftop-solar-in-gurugram.html', file: 'locations/gurugram.html' },
  { path: 'rooftop-solar-in-ncr.html', file: 'locations/ncr.html' },
  { path: 'rooftop-solar-in-haryana.html', file: 'locations/haryana.html' },
  { path: 'rooftop-solar-in-gwalior.html', file: 'locations/gwalior.html' },
  { path: 'rooftop-solar-in-indore.html', file: 'locations/indore.html' },
  { path: 'rooftop-solar-in-bhind.html', file: 'locations/bhind.html' },

  // Legal Pages
  { path: 'privacy-policy.html', file: 'legal/privacy-policy.html' },
  { path: 'terms-of-use.html', file: 'legal/terms-of-use.html' },
];

async function buildStaticSite() {
  console.log('🚀 Building static site for Netlify...');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process each HTML file
  for (const route of routes) {
    const inputPath = path.join(viewsDir, route.file);
    const outputPath = path.join(outputDir, route.path);

    try {
      const html = await Bun.file(inputPath).text();
      // Skip navbar/footer injection for 404 page
      const processed = route.file === '404.html' ? html : await processHTML(html);

      // Create directory if it doesn't exist
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Write processed HTML
      fs.writeFileSync(outputPath, processed);
      console.log(`✅ Built: ${route.path}`);
    } catch (error) {
      console.error(`❌ Error building ${route.path}:`, error);
    }
  }

  // Copy public directory contents
  console.log('📁 Copying public assets...');
  copyDir('./public', outputDir);

  console.log('✨ Static site build complete!');
}

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory ${src} does not exist`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

buildStaticSite().catch(console.error);
