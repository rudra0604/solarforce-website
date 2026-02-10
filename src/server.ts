import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { processHTML } from './utils/componentInjector';

// Import routes
import { homeRoutes } from './routes/home';
import { solutionRoutes } from './routes/solutions';
import { locationRoutes } from './routes/locations';
import { pageRoutes } from './routes/pages';
import { apiRoutes } from './routes/api';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', compress());
app.use('*', cors());
app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:", "https://images.unsplash.com", "https://lh3.googleusercontent.com"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.tailwindcss.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'"],
  },
  crossOriginEmbedderPolicy: false,
}));

// Static files
app.use('/assets/*', serveStatic({ root: './public' }));
app.use('/img/*', serveStatic({ root: './public' }));
app.use('/css/*', serveStatic({ root: './public' }));
app.use('/js/*', serveStatic({ root: './public' }));
app.use('/logo.svg', serveStatic({ path: './logo.svg' }));
app.use('/favicon.ico', serveStatic({ path: './public/assets/images/fav-icon/favicon.ico' }));

// Mount routes
app.route('/', homeRoutes);
app.route('/', solutionRoutes);
app.route('/', locationRoutes);
app.route('/pages', pageRoutes);
app.route('/api', apiRoutes);

// Legal pages
app.get('/legal/privacy', async (c) => {
  const html = await Bun.file('./src/views/legal/privacy-policy.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

app.get('/legal/terms', async (c) => {
  const html = await Bun.file('./src/views/legal/terms-of-use.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Sitemap page
app.get('/sitemap', async (c) => {
  const html = await Bun.file('./src/views/sitemap.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Sitemap XML
app.get('/sitemap.xml', async (c) => {
  const sitemap = await Bun.file('./public/sitemap.xml').text();
  return c.text(sitemap, 200, { 'Content-Type': 'application/xml' });
});

// Robots.txt
app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /

Sitemap: https://www.solarforce.in/sitemap.xml`, 200, { 'Content-Type': 'text/plain' });
});

// 404 handler
app.notFound(async (c) => {
  const html = await Bun.file('./src/views/404.html').text();
  // Do not process HTML for 404 pages to avoid adding navbar/footer
  return c.html(html, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.html('<h1>500 - Internal Server Error</h1>', 500);
});


const port = process.env.PORT || 3001;

console.log(`🌞 SolarForce server running at http://localhost:${port}`);

// Export for Bun runtime
export default {
  port,
  fetch: app.fetch,
};

// Export for Vercel serverless
export { app };
