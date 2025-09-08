import type { Category, ProductDetails, ProductSummary } from './types';
import i18n from '../../shared/lib/i18n';

export async function fetchProducts(params: {
  page: number;
  limit: number;
  category?: Category;
  isNew?: boolean;
  onSale?: boolean;
  lang?: string;
}): Promise<{
  items: ProductSummary[];
  total: number;
  hasNext: boolean;
  page: number;
  limit: number;
}> {
  const { page, limit, category, isNew, onSale, lang = i18n.language } = params;
  const q = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    lang,
    ...(category ? { category } : {}),
    ...(isNew ? { isNew: 'true' } : {}),
    ...(onSale ? { onSale: 'true' } : {}),
  });
  const res = await fetch(`/api/products?${q.toString()}`);
  if (!res.ok) throw new Error(`Failed /api/products: ${res.status}`);
  return res.json();
}

export async function fetchProductById(
  id: string,
  lang = i18n.language
): Promise<ProductDetails> {
  const q = new URLSearchParams({ lang });
  const res = await fetch(`/api/products/${id}?${q.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

export async function fetchSimilarProducts(
  id: string,
  limit = 12,
  lang = i18n.language
) {
  const q = new URLSearchParams({ limit: String(limit), lang });
  const res = await fetch(`/api/products/${id}/similar?${q.toString()}`);
  if (!res.ok) throw new Error('Failed to load similar products');
  return res.json() as Promise<ProductSummary[]>;
}

export async function fetchNewProducts(limit = 12, lang = i18n.language) {
  const q = new URLSearchParams({ isNew: 'true', limit: String(limit), lang });
  const res = await fetch(`/api/products?${q.toString()}`);
  if (!res.ok) throw new Error('Failed to load new products');
  return res.json().then((d) => d.items as ProductSummary[]);
}

export async function fetchDiscountedProducts(
  limit = 12,
  lang = i18n.language
) {
  const q = new URLSearchParams({ onSale: 'true', limit: String(limit), lang });
  const res = await fetch(`/api/products?${q.toString()}`);
  if (!res.ok) throw new Error('Failed to load discounted products');
  return res.json().then((d) => d.items as ProductSummary[]);
}
