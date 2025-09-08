import { useQuery } from '@tanstack/react-query';
import ProductsCarousel from './ProductsCarousel';
import { useTranslation } from 'react-i18next';
import { fetchSimilarProducts } from '../../entities/product/api';

interface SimilarProductsCarouselProps {
  productId: string;
  limit?: number;
}

const SimilarProductsCarousel = ({
  productId,
  limit = 12,
}: SimilarProductsCarouselProps) => {
  const { i18n, t } = useTranslation();
  const q = useQuery({
    queryKey: ['similar', productId, i18n.language, limit],
    queryFn: () => fetchSimilarProducts(productId, limit, i18n.language),
    enabled: !!productId,
    staleTime: 60_000,
  });

  if (q.isLoading) return <div className="p-6">Loading…</div>;
  if (!q.data?.length) return null;

  return (
    <ProductsCarousel
      title={t('widgets.carousels.similarProducts')}
      products={q.data}
    />
  );
};

export default SimilarProductsCarousel;
