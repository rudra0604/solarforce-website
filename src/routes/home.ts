import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';

const homeRoutes = new Hono();

// Homepage
homeRoutes.get('/', async (c) => {
  const html = await Bun.file('./src/views/index.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// New Homepage V2 (Redesigned)
homeRoutes.get('/v2', async (c) => {
  const html = await Bun.file('./src/views/index-v2.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// About Us
homeRoutes.get('/about-us', async (c) => {
  const html = await Bun.file('./src/views/about.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Homes (Residential)
homeRoutes.get('/homes', async (c) => {
  const html = await Bun.file('./src/views/offer/residential.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Housing Society
homeRoutes.get('/housing-society', async (c) => {
  const html = await Bun.file('./src/views/offer/housing-society.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Commercial
homeRoutes.get('/commercial', async (c) => {
  const html = await Bun.file('./src/views/offer/commercial.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Solar Pro (Calculator)
homeRoutes.get('/solar-pro', async (c) => {
  const html = await Bun.file('./src/views/calculator.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Calculator (alternate route)
homeRoutes.get('/calculator', async (c) => {
  const html = await Bun.file('./src/views/calculator.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// C&I Solar Calculator (Commercial & Industrial)
homeRoutes.get('/ci-calculator', async (c) => {
  const html = await Bun.file('./src/views/ci-calculator.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// C&I Calculator alternate routes
homeRoutes.get('/commercial-calculator', async (c) => {
  const html = await Bun.file('./src/views/ci-calculator.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

homeRoutes.get('/industrial-calculator', async (c) => {
  const html = await Bun.file('./src/views/ci-calculator.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Go Solar (Lead capture)
homeRoutes.get('/go-solar', async (c) => {
  const html = await Bun.file('./src/views/go-solar.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Thank You page (after form submission)
homeRoutes.get('/thank-you', async (c) => {
  const html = await Bun.file('./src/views/thank-you.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Contact page
homeRoutes.get('/contact', async (c) => {
  const html = await Bun.file('./src/views/contact.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Privacy Policy
homeRoutes.get('/privacy-policy', async (c) => {
  const html = await Bun.file('./src/views/legal/privacy-policy.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Terms of Use
homeRoutes.get('/terms-of-use', async (c) => {
  const html = await Bun.file('./src/views/legal/terms-of-use.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

export { homeRoutes };
