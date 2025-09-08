export const categories = [
  'table',
  'chair',
  'bed',
  'sofa',
  'carpet',
  'lamp',
] as const;

export type Category = (typeof categories)[number];

export type Product = {
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
