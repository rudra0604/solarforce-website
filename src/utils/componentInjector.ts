/**
 * Utility to inject navbar and footer components into HTML pages
 */

export async function injectComponents(html: string): Promise<string> {
  try {
    // Read navbar and footer components
    const navbarFile = Bun.file('./src/components/navbar.html');
    const footerFile = Bun.file('./src/components/footer.html');
    
    const navbar = await navbarFile.text();
    const footer = await footerFile.text();
    
    // Inject navbar after <body> tag
    let result = html.replace(
      /(<body[^>]*>)/i,
      `$1\n${navbar}`
    );
    
    // Inject footer before </body> tag
    result = result.replace(
      /(<\/body>)/i,
      `${footer}\n$1`
    );
    
    return result;
  } catch (error) {
    console.error('Error injecting components:', error);
    return html;
  }
}

/**
 * Remove existing header and footer tags from HTML to avoid duplication
 */
export function removeExistingComponents(html: string): string {
  // Remove existing header tag and its content
  let result = html.replace(
    /<header[\s\S]*?<\/header>\s*(<script>[\s\S]*?document\.getElementById\('mobile-menu-btn'\)[\s\S]*?<\/script>)?/gi,
    ''
  );
  
  // Remove existing footer tag and its content
  result = result.replace(
    /<footer[\s\S]*?<\/footer>/gi,
    ''
  );
  
  return result;
}

/**
 * Process HTML file by removing old components and injecting new ones
 */
export async function processHTML(html: string): Promise<string> {
  const cleaned = removeExistingComponents(html);
  return await injectComponents(cleaned);
}
