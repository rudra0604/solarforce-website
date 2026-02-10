import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';

const pageRoutes = new Hono();

// /pages/* routes (matching competitor structure)

pageRoutes.get('/on-grid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/on-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

pageRoutes.get('/off-grid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/off-grid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

pageRoutes.get('/hybrid-solar-system', async (c) => {
  const html = await Bun.file('./src/views/solutions/hybrid.html').text();
  const processed = await processHTML(html);
  return c.html(processed);
});

export { pageRoutes };
