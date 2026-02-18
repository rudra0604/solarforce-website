import { Hono } from 'hono';
import { processHTML } from '../utils/componentInjector';
import { readFile } from '../utils/fileReader';

const pageRoutes = new Hono();

// /pages/* routes (matching competitor structure)

pageRoutes.get('/on-grid-solar-system', async (c) => {
  const html = await readFile('./src/views/solutions/on-grid.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

pageRoutes.get('/off-grid-solar-system', async (c) => {
  const html = await readFile('./src/views/solutions/off-grid.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

pageRoutes.get('/hybrid-solar-system', async (c) => {
  const html = await readFile('./src/views/solutions/hybrid.html');
  const processed = await processHTML(html);
  return c.html(processed);
});

export { pageRoutes };
