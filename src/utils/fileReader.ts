/**
 * Cross-platform file reader
 * Works on both Bun (local development) and Node.js (Vercel deployment)
 */
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Read a file as text, compatible with both Bun and Node.js
 * @param filePath - Relative path from project root (e.g., './src/views/index.html')
 */
export async function readFile(filePath: string): Promise<string> {
    // Normalize the path - remove leading './' if present
    const cleanPath = filePath.startsWith('./') ? filePath.slice(2) : filePath;
    const absolutePath = join(process.cwd(), cleanPath);

    try {
        // Try Bun.file first (faster, available in Bun runtime)
        if (typeof globalThis.Bun !== 'undefined') {
            return await Bun.file(absolutePath).text();
        }
    } catch {
        // Fall through to Node.js method
    }

    // Fallback to Node.js fs (works on Vercel)
    return readFileSync(absolutePath, 'utf-8');
}
