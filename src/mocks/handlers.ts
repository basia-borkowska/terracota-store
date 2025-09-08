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
    const isNewParam = url.searchParams.get('isNew');
    const lang = url.searchParams.get('lang') ?? 'en';
    const category = url.searchParams.get('category') as Category | null;
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '30'));

    const all = await loadProducts(lang);
    const onSale = url.searchParams.get('onSale') === 'true';
    let filtered = category ? all.filter((p) => p.category === category) : all;
    if (url.searchParams.get('isNew') === 'true')
      filtered = filtered.filter((p) => p.isNew);
    if (onSale) filtered = filtered.filter((p) => p.discountedPrice != null);

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

  // GET /api/products/:id
  http.get('/api/products/:id', async ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') ?? 'en';

    const short = lang.split('-')[0];
    const tryLang = short === 'pl' ? 'pl' : 'en';

    let res = await fetch(`/data/${tryLang}/products.json`);
    if (!res.ok && tryLang !== 'en')
      res = await fetch(`/data/en/products.json`);
    if (!res.ok)
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });

    const all = (await res.json()) as any[];
    const product = all.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  // GET /api/products/:id/similar?lang=en&limit=12
  http.get('/api/products/:id/similar', async ({ params, request }) => {
    const { id } = params as { id: string };
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') ?? 'en';
    const limit = Number(url.searchParams.get('limit') ?? '12');

    // load all
    let res = await fetch(`/data/${lang}/products.json`);
    if (!res.ok && lang !== 'en') res = await fetch(`/data/en/products.json`);
    if (!res.ok) return HttpResponse.json([], { status: 200 });

    const all = (await res.json()) as any[];
    const current = all.find((p) => p.id === id);
    if (!current) return HttpResponse.json([], { status: 200 });

    const similar = all
      .filter((p) => p.category === current.category && p.id !== id)
      .slice(0, limit);

    return HttpResponse.json(similar);
  }),
];
