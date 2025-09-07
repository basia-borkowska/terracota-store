import type { Product } from '../entities/product/types';
import ProductCard from './ProductCard';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
