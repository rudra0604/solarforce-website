
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'fs';
import { join, relative, resolve } from 'path';

// Use process.cwd() assuming script is run from project root
const ROOT_DIR = process.cwd();
const SRC_DIR = resolve(ROOT_DIR, 'src');
const OUTPUT_FILE = resolve(ROOT_DIR, 'src/generated/templates.ts');
const OUTPUT_DIR = resolve(ROOT_DIR, 'src/generated');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
}

const htmlMap = {};

function scanDirectory(dir) {
    const files = readdirSync(dir);

    for (const file of files) {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            // Create a key relative to src, e.g., 'views/index.html'
            let relativePath = relative(SRC_DIR, fullPath);
            // Ensure forward slashes for cross-platform consistency
            relativePath = relativePath.replace(/\\/g, '/');

            // Also store with 'src/' prefix to match fileReader inputs like './src/views/...'
            const srcPrefixedPath = `src/${relativePath}`;

            const content = readFileSync(fullPath, 'utf-8');

            // Store both variations to be safe
            htmlMap[relativePath] = content;
            htmlMap[srcPrefixedPath] = content;
            console.log(`✅ Compiled: ${srcPrefixedPath}`);
        }
    }
}

console.log('🔄 Generating HTML templates...');
try {
    scanDirectory(SRC_DIR);

    const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * This file contains all HTML templates compiled into TypeScript strings.
 * This guarantees Vercel/Serverless functions can access them without file system errors.
 */

export const HTML_TEMPLATES = ${JSON.stringify(htmlMap, null, 2)};
`;

    writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`✨ Successfully generated ${Object.keys(htmlMap).length / 2} templates to src/generated/templates.ts`);
} catch (error) {
    console.error('❌ Failed to generate templates:', error);
    process.exit(1);
}
