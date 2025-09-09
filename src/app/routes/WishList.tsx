import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import ProductCard from '../../widgets/ProductCard';
import { useWishList } from '../../features/wishlist/model/useWishList';
import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../entities/product/api';
import type { ProductDetails } from '../../entities/product/types';
import { Button } from '../../shared/ui/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { pathnames } from '../../shared/lib/pathnames';

const PAGE_SIZE = 30;

const WishList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ids } = useWishList();

  // stable, reversed or keep order as-is
  const allIds = useMemo(() => ids.slice().reverse(), [ids]);

  const q = useInfiniteQuery({
    queryKey: ['wishlist-page', allIds],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * PAGE_SIZE;
      const slice = allIds.slice(start, start + PAGE_SIZE);
      const items = await Promise.all(slice.map((id) => fetchProductById(id)));
      return {
        items,
        nextPage:
          start + PAGE_SIZE < allIds.length
            ? (pageParam as number) + 1
            : undefined,
      };
    },
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 0,
  });

  const products: ProductDetails[] =
    q.data?.pages.flatMap((p: { items: any }) => p.items) ?? [];

  if (q.isLoading) return <div>Loading…</div>;

  return (
    <PageWrapper className="flex flex-col">
      <div className="flex font-medium  flex-col gap-6 items-center mb-8 text-center">
        <h1 className="text-5xl text-interactive">{t('wishList.header')}</h1>
        <h4 className="max-w-[700px]">
          {products.length > 0
            ? t('wishList.description')
            : t('wishList.emptyStateDescription')}
        </h4>
      </div>

      {products.length === 0 && (
        <Button
          className="mx-auto min-w-[200px]"
          onClick={() => navigate(pathnames.products)}
        >
          {t('wishList.browseProducts')}
        </Button>
      )}

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {q.hasNextPage && (
        <button
          onClick={() => q.fetchNextPage()}
          disabled={q.isFetchingNextPage}
          className="mt-6 text-sm underline"
        >
          {q.isFetchingNextPage ? 'Loading…' : 'Load more'}
        </button>
      )}
    </PageWrapper>
  );
};

export default WishList;
