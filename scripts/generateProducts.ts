// scripts/generateProducts.ts
import fs from 'fs';
import path from 'path';

const categories = ['table', 'chair', 'bed', 'sofa', 'carpet', 'lamp'] as const;
type Category = (typeof categories)[number];

const SAMPLES_ROOT = path.join(process.cwd(), 'public/images/samples');
const PLACEHOLDER_URL = '/images/placeholder.svg'; // optional safety net

// Load sample filenames for a category folder, returned as public URLs
function loadCategoryPool(category: Category): string[] {
  const dir = path.join(SAMPLES_ROOT, category);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort(); // stable order
  return files.map((f) => `/images/samples/${category}/${f}`);
}

// Simple seeded RNG (deterministic per product)
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return () => {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
}

// Pick n items from pool deterministically; cycle if pool is small
function pickImages(pool: string[], n: number, seed: number): string[] {
  if (pool.length === 0) return Array(n).fill(PLACEHOLDER_URL);
  if (pool.length <= n) {
    return Array.from({ length: n }, (_, i) => pool[i % pool.length]);
  }
  const rand = seededRandom(seed);
  const chosen = new Set<number>();
  while (chosen.size < n) chosen.add(Math.floor(rand() * pool.length));
  return Array.from(chosen).map((i) => pool[i]);
}

function makeImages(id: string, category: Category, lang: 'en' | 'pl') {
  const pool = loadCategoryPool(category);
  const numeric = parseInt(id.slice(1), 10); // p001 -> 1
  const count = 3 + (numeric % 3); // 3,4,5
  return pickImages(pool, count, numeric);
}

function makeProduct(i: number, lang: 'en' | 'pl') {
  const category = categories[i % categories.length];
  const id = `p${String(i + 1).padStart(3, '0')}`;

  const titleEn = {
    table: 'Dining Table',
    chair: 'Accent Chair',
    bed: 'Platform Bed',
    sofa: 'Modern Sofa',
    carpet: 'Area Carpet',
    lamp: 'Floor Lamp',
  }[category];

  const descEn = {
    table: 'Sturdy table for family meals.',
    chair: 'Comfortable chair with padded seat.',
    bed: 'Minimalist bed frame with slats.',
    sofa: '3-seater sofa with deep cushions.',
    carpet: 'Soft woven carpet, easy to clean.',
    lamp: 'Adjustable lamp with linen shade.',
  }[category];

  const titlePl = {
    table: 'Stół jadalniany',
    chair: 'Fotel',
    bed: 'Łóżko platformowe',
    sofa: 'Sofa nowoczesna',
    carpet: 'Dywan',
    lamp: 'Lampa stojąca',
  }[category];

  const descPl = {
    table: 'Solidny stół do rodzinnych posiłków.',
    chair: 'Wygodne krzesło z miękkim siedziskiem.',
    bed: 'Minimalistyczna rama łóżka z listwami.',
    sofa: 'Sofa trzyosobowa z głębokimi poduszkami.',
    carpet: 'Miękki tkany dywan, łatwy w czyszczeniu.',
    lamp: 'Regulowana lampa z lnianym abażurem.',
  }[category];

  const price = Math.round(50 + (i % 50) * 20 + Math.random() * 100);

  // ~25% discounted
  let discountedPrice: number | undefined;
  if (Math.random() < 0.25) {
    const discountFactor = 0.8 + Math.random() * 0.15; // ~15–20% off
    discountedPrice = Math.round(price * discountFactor * 100) / 100;
  }

  const isOnWishList = Math.random() < 0.1;
  const isNew = Math.random() < 0.1;
  const images = makeImages(id, category, lang);

  return {
    id,
    title: lang === 'en' ? `${titleEn} #${i + 1}` : `${titlePl} #${i + 1}`,
    description: lang === 'en' ? descEn : descPl,
    images, // from /public/images/samples/<category>/
    category,
    price,
    discountedPrice,
    currency: 'PLN',
    isOnWishList,
    isNew,
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
