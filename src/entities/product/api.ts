import type { Product } from './types';
import i18n from '../../shared/lib/i18n';

let cache: Record<string, Product[] | undefined> = {};

const fetchProducts = async (lang = i18n.language): Promise<Product[]> => {
  const key = lang.split('-')[0] === 'pl' ? 'pl' : 'en';

  try {
    if (!cache[key]) {
      const res = await fetch(`/data/${key}/products.json`);
      cache[key] = await res.json();
    }
  } catch (error) {
    throw new Error('Failed to fetch products');
  }

  return cache[key] as Product[];
};

export const fetchProductsPaginated = async (
  page: number,
  pageSize: number,
  lang?: string
) => {
  const all = await fetchProducts(lang);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = all.slice(start, end);
  return { items, hasNext: end < all.length };
};
