import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { Product as ProductType } from '../../entities/product/types';
import { fetchProductById } from '../../entities/product/api';
import { Gallery } from '../../shared/ui/molecules/Gallery';
import ProductDetails from '../../widgets/ProductDetails';
import { Carousel } from '../../shared/ui/molecules/Carousel';
import SimilarProductsCarousel from '../../widgets/carousels/SimilarProductsCarousel';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();

  const {
    data: product,
    isPending,
    isError,
  } = useQuery<ProductType>({
    queryKey: ['product', id, i18n.language],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
    staleTime: 60_000,
    retry: 1,
  });

  if (isPending) return <div className="p-6">Loading…</div>;
  if (isError || !product)
    return <div className="p-6 text-red-600">Product not found</div>;

  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2">
          <Gallery images={product.images} />
        </div>

        <aside className="md:col-span-1 md:sticky md:top-14 self-start py-6 md:py-12 md:px-12">
          <ProductDetails
            product={product}
            onAddToCart={() => alert('Implement add to cart')}
            onToggleWishlist={() => alert('Implement adding to favorites')}
          />
        </aside>
      </div>

      <PageWrapper>
        <SimilarProductsCarousel productId={product.id} />
      </PageWrapper>
    </div>
  );
};
export default Product;
