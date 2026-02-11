import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';

const locationRoutes = new Hono();

// Location-based landing pages (matching competitor sitemap)

// Delhi NCR Region
locationRoutes.get('/rooftop-solar-in-delhi', async (c) => {
  const html = await Bun.file('./src/views/locations/delhi.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Redirect old Gurugram URL to Haryana page
locationRoutes.get('/rooftop-solar-in-gurugram', async (c) => {
  return c.redirect('/rooftop-solar-in-haryana', 301);
});

locationRoutes.get('/rooftop-solar-in-ncr', async (c) => {
  const html = await Bun.file('./src/views/locations/ncr.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-haryana', async (c) => {
  const html = await Bun.file('./src/views/locations/haryana.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Madhya Pradesh Region
locationRoutes.get('/rooftop-solar-in-gwalior', async (c) => {
  const html = await Bun.file('./src/views/locations/gwalior.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-indore', async (c) => {
  const html = await Bun.file('./src/views/locations/indore.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-bhind', async (c) => {
  const html = await Bun.file('./src/views/locations/bhind.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Contact page for locations
locationRoutes.get('/contact', async (c) => {
  const html = await Bun.file('./src/views/contact.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

export { locationRoutes };
