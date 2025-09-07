export type Category = 'table' | 'chair' | 'sofa' | 'bed' | 'carpet' | 'lamp';

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
