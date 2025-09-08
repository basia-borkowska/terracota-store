import { useQuery } from '@tanstack/react-query';
import ProductsCarousel from './ProductsCarousel';
import { useTranslation } from 'react-i18next';
import { fetchDiscountedProducts } from '../../entities/product/api';

interface DiscountedProductsCarouselProps {
  limit?: number;
}

const DiscountedProductsCarousel = ({
  limit = 12,
}: DiscountedProductsCarouselProps) => {
  const { i18n, t } = useTranslation();

  const q = useQuery({
    queryKey: ['discounted', i18n.language, limit],
    queryFn: () => fetchDiscountedProducts(limit, i18n.language),
    staleTime: 60_000,
  });

  if (q.isLoading) return <div className="p-6">Loading…</div>;
  if (!q.data?.length) return null;

  return (
    <ProductsCarousel
      title={t('widgets.carousels.discountedProducts')}
      products={q.data}
      cardProps={{ showDiscountBadge: false }}
    />
  );
};

export default DiscountedProductsCarousel;
