// Script to clean all HTML files - removes existing headers and footers
// The server will inject the components from src/components/ automatically

import { removeExistingComponents } from '../src/utils/componentInjector';
import { readdir } from 'fs/promises';
import { join } from 'path';

const viewsDir = './src/views';

async function getAllHTMLFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  async function scan(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function cleanHTMLFile(filePath: string) {
  try {
    const file = Bun.file(filePath);
    const content = await file.text();
    
    // Remove existing headers and footers
    const cleaned = removeExistingComponents(content);
    
    // Write back the cleaned content
    await Bun.write(filePath, cleaned);
    
    console.log(`✅ Cleaned: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error);
  }
}

async function main() {
  console.log('🧹 Starting HTML cleanup...\n');
  
  const htmlFiles = await getAllHTMLFiles(viewsDir);
  
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  
  for (const file of htmlFiles) {
    await cleanHTMLFile(file);
  }
  
  console.log('\n✨ All HTML files cleaned!');
  console.log('The server will now inject navbar and footer from src/components/');
}

main();
