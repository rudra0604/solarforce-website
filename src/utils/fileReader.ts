/**
 * Cross-platform file reader
 * Works on both Bun (local development) and Node.js (Vercel deployment)
 */
import { readFileSync } from 'fs';
import { join } from 'path';

import { HTML_TEMPLATES } from '../generated/templates';

/**
 * Read a file as text, compatible with both Bun and Node.js
 * @param filePath - Relative path from project root (e.g., './src/views/index.html')
 */
export async function readFile(filePath: string): Promise<string> {
    // Normalize the path - remove leading './' if present
    let cleanPath = filePath.startsWith('./') ? filePath.slice(2) : filePath;

    // 1. Try Bun.file first (Local Dev - always fresh)
    const absolutePath = join(process.cwd(), cleanPath);
    try {
        // @ts-ignore
        if (typeof globalThis.Bun !== 'undefined') {
            // @ts-ignore
            return await Bun.file(absolutePath).text();
        }
    } catch {
        // Fall through
    }

    // 2. Try Pre-compiled Templates (Vercel Production - avoids file system errors)
    if (HTML_TEMPLATES[cleanPath]) {
        return HTML_TEMPLATES[cleanPath];
    }

    // Also try without 'src/' prefix if Vercel flattened structure
    if (cleanPath.startsWith('src/') && HTML_TEMPLATES[cleanPath.replace('src/', '')]) {
        return HTML_TEMPLATES[cleanPath.replace('src/', '')];
    }

    // Node.js fallback (Vercel)
    try {
        return readFileSync(absolutePath, 'utf-8');
    } catch (error: any) {
        console.error(`❌ Error reading file at ${absolutePath}:`, error.message);
        console.error(`📂 Current Directory (cwd): ${process.cwd()}`);

        // Try fallback: sometimes Vercel flattens structure, try looking without 'src/'
        if (cleanPath.startsWith('src/')) {
            const fallbackPath = join(process.cwd(), cleanPath.replace('src/', ''));
            console.log(`🔄 Trying fallback path: ${fallbackPath}`);
            try {
                return readFileSync(fallbackPath, 'utf-8');
            } catch (fallbackError) {
                console.error(`❌ Fallback failed:`, fallbackError);
            }
        }

        throw error; // Re-throw so Vercel knows it failed
    }
}
