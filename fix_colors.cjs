const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(tsxPath, 'utf8');

// The new palette:
// #F8F0E5 (light cream) -> primary (old was dark green)
// #6F7E57 (medium green) -> secondary
// #575B44 (dark olive) -> alt-1
// #FAF5EF (very light cream) -> alt-2
// #f7ebc3 (warm cream) -> cream (old body bg)
// #693311 (dark brown) -> gold (old gold)

// 1. Resolve general `text-brand-primary` visibility issues on light backgrounds
// We will replace text-brand-primary with text-[#6F7E57]
content = content.replace(/text-brand-primary/g, 'text-[#6F7E57]');

// 2. Resolve `bg-brand-primary` when paired with `text-white`
// We will replace bg-brand-primary with bg-[#6F7E57] for buttons/badges
content = content.replace(/bg-brand-primary/g, 'bg-[#6F7E57]');

// 3. Resolve ring colors
content = content.replace(/ring-brand-primary/g, 'ring-[#6F7E57]');

// 4. Resolve border colors
content = content.replace(/border-brand-primary/g, 'border-[#6F7E57]');

// SPECIFIC REQUESTS:
// "replace the main image on the landing page where everything your home needs delivered is with "front page" in the public folder"
content = content.replace(/hero_main\.jpeg/g, 'front page.jpeg');

// "Change the CTA background color of the Login/Register to #693311"
// Need to find the exact login/register button.
content = content.replace(/<button[^>]*>\s*Login \/ Register\s*<\/button>/g, match => {
    return match.replace(/bg-\[#6F7E57\]/g, 'bg-[#693311]');
});

// "replace the image on the Female-Driven Insight to "Women in the kitchen" in te public folder"
content = content.replace(/women\.JPG/g, 'Women in the kitchen.JPG');

// "on the "Partners" page, the color layout looks pale, introduce #6F7E57 and #6F7E57, resolve any conflicting colors on a background eg white on off white or cream background"
// Let's replace bg-zinc-50 and text-zinc-500 on partners page with #6F7E57 accents later.

// "In Our Difference Section change font colors to #575B44"
// Locate Our Difference section
// "In Our Sourcing Promise Section change font colors to #575B44"
content = content.replace(/<section className="relative py-24[^>]*>([\s\S]*?)Our Difference([\s\S]*?)<\/section>/g, match => {
    // Let's just do a global replace for the text color within this section
    return match.replace(/text-zinc-600/g, 'text-[#575B44]').replace(/text-\[#f7ebc3\]/g, 'text-[#F8F0E5]').replace(/text-white/g, 'text-[#FAF5EF]');
});

content = fs.writeFileSync(tsxPath, content);
console.log('Script completed basic replacements');
