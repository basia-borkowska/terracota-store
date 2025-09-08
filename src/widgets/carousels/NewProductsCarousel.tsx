import { useQuery } from '@tanstack/react-query';
import ProductsCarousel from './ProductsCarousel';
import { useTranslation } from 'react-i18next';
import { fetchNewProducts } from '../../entities/product/api';

interface NewProductsCarouselProps {
  limit?: number;
}

const NewProductsCarousel = ({ limit = 12 }: NewProductsCarouselProps) => {
  const { i18n, t } = useTranslation();

  const q = useQuery({
    queryKey: ['new', i18n.language, limit],
    queryFn: () => fetchNewProducts(limit, i18n.language),
    staleTime: 60_000,
  });

  if (q.isLoading) return <div className="p-6">Loading…</div>;
  if (!q.data?.length) return null;

  return (
    <ProductsCarousel
      title={t('widgets.carousels.newProducts')}
      products={q.data}
      cardProps={{ showNewBadge: false }}
    />
  );
};

export default NewProductsCarousel;
