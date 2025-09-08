export const categories = [
  'table',
  'chair',
  'bed',
  'sofa',
  'carpet',
  'lamp',
] as const;

export type Category = (typeof categories)[number];

export type ProductSummary = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  category: Category;
  images: string[];
  isOnWishList: boolean;
  isNew: boolean;
};

export type ProductDetails = ProductSummary & {
  images: string[];
  // add detail-only fields as it grows (specs, dimensions, etc.)
};
