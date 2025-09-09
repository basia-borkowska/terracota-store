// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // LIST: /api/products
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') ?? 'en';
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '30'));
    const category = url.searchParams.get('category');
    const isNew = url.searchParams.get('isNew') === 'true';
    const onSale = url.searchParams.get('onSale') === 'true';

    let res = await fetch(`/data/${lang}/products.json`);
    if (!res.ok && lang !== 'en') res = await fetch(`/data/en/products.json`);
    if (!res.ok)
      return HttpResponse.json({
        items: [],
        page,
        limit,
        total: 0,
        hasNext: false,
      });

    const all = (await res.json()) as any[];
    let filtered = all;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (isNew) filtered = filtered.filter((p) => p.isNew);
    if (onSale) filtered = filtered.filter((p) => p.discountedPrice != null);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit).map((p) => ({
      ...p,
      images: (p.images ?? []).slice(0, 2), // <= 2 images on list
    }));

    return HttpResponse.json({
      items,
      page,
      limit,
      total,
      hasNext: start + limit < total,
    });
  }),

  // DETAIL: /api/products/:id
  http.get('/api/products/:id', async ({ params, request }) => {
    const { id } = params as { id: string };
    const lang = new URL(request.url).searchParams.get('lang') ?? 'en';

    let res = await fetch(`/data/${lang}/products.json`);
    if (!res.ok && lang !== 'en') res = await fetch(`/data/en/products.json`);
    if (!res.ok)
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });

    const all = (await res.json()) as any[];
    const product = all.find((p) => p.id === id);
    return product
      ? HttpResponse.json(product) // full images here
      : HttpResponse.json({ error: 'Not found' }, { status: 404 });
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
      .slice(0, limit)
      .map((p) => ({
        ...p,
        images: (p.images ?? []).slice(0, 2),
      }));

    return HttpResponse.json(similar);
  }),
];
