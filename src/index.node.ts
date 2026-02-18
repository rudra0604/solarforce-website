
/**
 * Main entry point for Node.js environments (e.g., Hostinger VPS, cPanel)
 * This file replaces the Bun runtime with Node.js logic.
 */
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { app } from './server';

// Serve static files from /public folder (CSS, JS, Images)
// This is critical for Hostinger where we manage the server ourselves
app.use('/assets/*', serveStatic({ root: './public' }));
app.use('/img/*', serveStatic({ root: './public' }));
app.use('/css/*', serveStatic({ root: './public' }));
app.use('/js/*', serveStatic({ root: './public' }));
app.use('/logo.svg', serveStatic({ root: './' }));
app.use('/favicon.ico', serveStatic({ root: './public/img/logo/logo.svg' }));
// Fallback for any other static files in public
app.use('/*', serveStatic({ root: './public' }));

const port = Number(process.env.PORT) || 3000;

console.log(`🚀 Server starting on Node.js port ${port}...`);

serve({
    fetch: app.fetch,
    port
});
