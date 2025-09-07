export type Category = 'table' | 'chair' | 'sofa' | 'bed' | 'carpet' | 'lamp';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  isOnWishList: boolean;
};
