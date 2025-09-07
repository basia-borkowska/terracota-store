// scripts/generateProducts.ts
import fs from 'fs';
import path from 'path';

const categories = ['table', 'chair', 'bed', 'sofa', 'carpet', 'lamp'] as const;

function makeProduct(i: number, lang: 'en' | 'pl') {
  const cat = categories[i % categories.length];
  const id = `p${String(i + 1).padStart(3, '0')}`;

  const titleEn = {
    table: 'Dining Table',
    chair: 'Accent Chair',
    bed: 'Platform Bed',
    sofa: 'Modern Sofa',
    carpet: 'Area Carpet',
    lamp: 'Floor Lamp',
  }[cat];

  const descEn = {
    table: 'Sturdy table for family meals.',
    chair: 'Comfortable chair with padded seat.',
    bed: 'Minimalist bed frame with slats.',
    sofa: '3-seater sofa with deep cushions.',
    carpet: 'Soft woven carpet, easy to clean.',
    lamp: 'Adjustable lamp with linen shade.',
  }[cat];

  const titlePl = {
    table: 'Stół jadalniany',
    chair: 'Fotel',
    bed: 'Łóżko platformowe',
    sofa: 'Sofa nowoczesna',
    carpet: 'Dywan',
    lamp: 'Lampa stojąca',
  }[cat];

  const descPl = {
    table: 'Solidny stół do rodzinnych posiłków.',
    chair: 'Wygodne krzesło z miękkim siedziskiem.',
    bed: 'Minimalistyczna rama łóżka z listwami.',
    sofa: 'Sofa trzyosobowa z głębokimi poduszkami.',
    carpet: 'Miękki tkany dywan, łatwy w czyszczeniu.',
    lamp: 'Regulowana lampa z lnianym abażurem.',
  }[cat];

  // 10% chance of being true
  const isOnWishList = Math.random() < 0.1;

  return {
    id,
    title: lang === 'en' ? `${titleEn} #${i + 1}` : `${titlePl} #${i + 1}`,
    description: lang === 'en' ? descEn : descPl,
    imageUrl: `https://picsum.photos/seed/${lang}-${id}/800/600`,
    category: cat,
    price: Math.round(50 + (i % 50) * 20 + Math.random() * 100),
    isOnWishList,
  };
}

function generate(lang: 'en' | 'pl') {
  const items = Array.from({ length: 200 }, (_, i) => makeProduct(i, lang));
  const file = path.join(process.cwd(), `public/data/${lang}/products.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`✔ Generated ${items.length} products in ${file}`);
}

generate('en');
generate('pl');
