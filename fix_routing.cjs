const fs = require('fs');
const filePath = './src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix "Explore Our Boxes" button - should go to products, not pricing
// This is the second setView('pricing') in the Hero section (line ~445)
const heroExplore = content.indexOf("Explore Our Boxes");
if (heroExplore !== -1) {
  // Find the setView('pricing') just before it
  const searchStart = Math.max(0, heroExplore - 300);
  const segment = content.substring(searchStart, heroExplore);
  const lastPricing = segment.lastIndexOf("setView('pricing')");
  if (lastPricing !== -1) {
    const absPos = searchStart + lastPricing;
    content = content.substring(0, absPos) + "setView('products')" + content.substring(absPos + "setView('pricing')".length);
    console.log('Fixed Explore Our Boxes routing -> products');
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done.');
