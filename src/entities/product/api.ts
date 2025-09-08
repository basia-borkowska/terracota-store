import type { Product } from './types';
import i18n from '../../shared/lib/i18n';

export async function fetchProducts(params: {
  page: number;
  limit: number;
  category?: Product['category'];
  lang?: string;
}): Promise<{
  items: Product[];
  total: number;
  hasNext: boolean;
  page: number;
  limit: number;
}> {
  const { page, limit, category, lang = i18n.language } = params;
  const q = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    lang,
    ...(category ? { category } : {}),
  });
  const res = await fetch(`/api/products?${q.toString()}`);
  if (!res.ok) throw new Error(`Failed /api/products: ${res.status}`);
  return res.json();
}
