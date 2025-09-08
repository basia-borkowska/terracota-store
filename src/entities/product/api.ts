import type { Product } from './types';
import i18n from '../../shared/lib/i18n';

export async function fetchProducts(params: {
  page: number;
  limit: number;
  category?: Product['category'];
  isNew?: boolean;
  lang?: string;
}): Promise<{
  items: Product[];
  total: number;
  hasNext: boolean;
  page: number;
  limit: number;
}> {
  const { page, limit, category, lang = i18n.language, isNew } = params;
  const q = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    lang,
    ...(category ? { category } : {}),
    ...(isNew ? { isNew: 'true' } : {}),
  });
  const res = await fetch(`/api/products?${q.toString()}`);
  if (!res.ok) throw new Error(`Failed /api/products: ${res.status}`);
  return res.json();
}

export async function fetchProductById(
  id: string,
  lang: string = i18n.language
): Promise<Product> {
  const q = new URLSearchParams({ lang });
  const res = await fetch(`/api/products/${id}?${q.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json() as Promise<Product>;
}
