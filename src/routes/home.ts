import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';
import { readFile } from '../utils/fileReader';

const homeRoutes = new Hono();

// Homepage
homeRoutes.get('/', async (c) => {
  const html = await readFile('./src/views/index.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// New Homepage V2 (Redesigned)
homeRoutes.get('/v2', async (c) => {
  const html = await readFile('./src/views/index-v2.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// About Us
homeRoutes.get('/about-us', async (c) => {
  const html = await readFile('./src/views/about.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Homes (Residential)
homeRoutes.get('/homes', async (c) => {
  const html = await readFile('./src/views/offer/residential.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Housing Society
homeRoutes.get('/housing-society', async (c) => {
  const html = await readFile('./src/views/offer/housing-society.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Commercial
homeRoutes.get('/commercial', async (c) => {
  const html = await readFile('./src/views/offer/commercial.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Solar Pro (Calculator)
homeRoutes.get('/solar-pro', async (c) => {
  const html = await readFile('./src/views/calculator.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Calculator (alternate route)
homeRoutes.get('/calculator', async (c) => {
  const html = await readFile('./src/views/calculator.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// C&I Solar Calculator (Commercial & Industrial)
homeRoutes.get('/ci-calculator', async (c) => {
  const html = await readFile('./src/views/ci-calculator.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// C&I Calculator alternate routes
homeRoutes.get('/commercial-calculator', async (c) => {
  const html = await readFile('./src/views/ci-calculator.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

homeRoutes.get('/industrial-calculator', async (c) => {
  const html = await readFile('./src/views/ci-calculator.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Go Solar (Lead capture)
homeRoutes.get('/go-solar', async (c) => {
  const html = await readFile('./src/views/go-solar.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Thank You page (after form submission)
homeRoutes.get('/thank-you', async (c) => {
  const html = await readFile('./src/views/thank-you.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Contact page
homeRoutes.get('/contact', async (c) => {
  const html = await readFile('./src/views/contact.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Privacy Policy
homeRoutes.get('/privacy-policy', async (c) => {
  const html = await readFile('./src/views/legal/privacy-policy.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Terms of Use
homeRoutes.get('/terms-of-use', async (c) => {
  const html = await readFile('./src/views/legal/terms-of-use.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

export { homeRoutes };
