// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

type Category = 'table' | 'chair' | 'bed' | 'sofa' | 'carpet' | 'lamp';

async function loadProducts(lang: string) {
  // fall back to EN if the localized file is missing
  const short = lang.split('-')[0];
  const tryLang = short === 'pl' ? 'pl' : 'en';
  let res = await fetch(`/data/${tryLang}/products.json`);
  if (!res.ok && tryLang !== 'en') res = await fetch(`/data/en/products.json`);
  if (!res.ok) throw new Error('Could not load mock products');
  return (await res.json()) as any[];
}

export const handlers = [
  // GET /api/products?lang=en&category=sofa&page=1&limit=30
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') ?? 'en';
    const category = url.searchParams.get('category') as Category | null;
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '30'));

    const all = await loadProducts(lang);
    const filtered = category
      ? all.filter((p) => p.category === category)
      : all;

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = filtered.slice(start, end);

    return HttpResponse.json({
      items,
      page,
      limit,
      total,
      hasNext: end < total,
    });
  }),
];
