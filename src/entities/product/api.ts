import type { Product } from './types';
import i18n from '../../shared/lib/i18n';

const getLanguage = (lang: string) => {
  // languageOnly (en, pl). Fallback to 'en' if unknown.
  const base = lang.split('-')[0];
  return base === 'pl' ? 'pl' : 'en';
};

export const fetchProducts = async (): Promise<Product[]> => {
  const lang = getLanguage(i18n.language);

  try {
    const res = await fetch(`/data/${lang}/products.json`);
    const data = await res.json();
    return data as Product[];
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id) || null;
    return product;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};
