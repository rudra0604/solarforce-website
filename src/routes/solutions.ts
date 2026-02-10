import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';

const solutionRoutes = new Hono();

// Solution type pages (matching competitor /pages/ structure)
solutionRoutes.get('/solutions/on-grid', async (c) => {
  const html = await Bun.file('./src/views/solutions/on-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

solutionRoutes.get('/solutions/off-grid', async (c) => {
  const html = await Bun.file('./src/views/solutions/off-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

solutionRoutes.get('/solutions/hybrid', async (c) => {
  const html = await Bun.file('./src/views/solutions/hybrid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Alternative URLs (navbar links)
solutionRoutes.get('/on-grid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/on-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

solutionRoutes.get('/off-grid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/off-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

solutionRoutes.get('/hybrid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/hybrid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Residential (redirect to offer)
solutionRoutes.get('/solutions/residential', async (c) => {
  const html = await Bun.file('./src/views/offer/residential.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Commercial sub-pages
solutionRoutes.get('/solutions/commercial', async (c) => {
  const html = await Bun.file('./src/views/offer/commercial.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

// Housing Society
solutionRoutes.get('/solutions/housing-society', async (c) => {
  const html = await Bun.file('./src/views/offer/housing-society.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

export { solutionRoutes };
