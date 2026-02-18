import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';
import { readFile } from '../utils/fileReader';

const locationRoutes = new Hono();

// Location-based landing pages (matching competitor sitemap)

// Delhi NCR Region
locationRoutes.get('/rooftop-solar-in-delhi', async (c) => {
  const html = await readFile('./src/views/locations/delhi.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Redirect old Gurugram URL to Haryana page
locationRoutes.get('/rooftop-solar-in-gurugram', async (c) => {
  return c.redirect('/rooftop-solar-in-haryana', 301);
});

locationRoutes.get('/rooftop-solar-in-ncr', async (c) => {
  const html = await readFile('./src/views/locations/ncr.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-haryana', async (c) => {
  const html = await readFile('./src/views/locations/haryana.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Madhya Pradesh Region
locationRoutes.get('/rooftop-solar-in-gwalior', async (c) => {
  const html = await readFile('./src/views/locations/gwalior.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-indore', async (c) => {
  const html = await readFile('./src/views/locations/indore.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

locationRoutes.get('/rooftop-solar-in-bhind', async (c) => {
  const html = await readFile('./src/views/locations/bhind.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

// Contact page for locations
locationRoutes.get('/contact', async (c) => {
  const html = await readFile('./src/views/contact.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

export { locationRoutes };
