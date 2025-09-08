import { useCallback } from 'react';
import { useIntersection } from '../shared/hooks/useIntersection';
import ProductCard from './ProductCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchProducts } from '../entities/product/api';
import type { Product } from '../entities/product/types';
import { SlidersHorizontal } from 'lucide-react';

const PAGE_SIZE = 30;

interface ProductListProps {
  filters?: { category?: Product['category']; isNew?: boolean };
  showNewBadge?: boolean;
}
const ProductList = ({ filters, showNewBadge }: ProductListProps) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const q = useInfiniteQuery({
    queryKey: [
      'products',
      i18n.language,
      PAGE_SIZE,
      filters?.category,
      !!filters?.isNew,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        page: pageParam as number,
        limit: PAGE_SIZE,
        category: filters?.category,
        isNew: filters?.isNew,
        lang: i18n.language,
      }),
    getNextPageParam: (last, all) =>
      last.hasNext ? all.length + 1 : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  const products = q.data?.pages.flatMap((page) => page.items) || [];

  const onIntersect = useCallback(() => {
    if (q.hasNextPage && !q.isFetchingNextPage) {
      q.fetchNextPage();
    }
  }, [q.hasNextPage, q.isFetchingNextPage, q.fetchNextPage]);

  const sentinelRef = useIntersection<HTMLDivElement>(onIntersect, {
    rootMargin: '400px',
    threshold: 0,
  });

  if (q.status === 'error')
    return <div className="p-6 text-red-600">Error: {String(q.error)}</div>; // TODO add better error handling
  if (q.status === 'pending') return <div className="p-6">Loading...</div>; // TODO add better loading state

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <SlidersHorizontal
          className="size-5 cursor-pointer"
          onClick={() => alert('Implement filtering')}
        />
        <span className="text-sm self-end">
          {products.length} {t('common.products').toLocaleLowerCase()}
        </span>
      </div>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showNewBadge={showNewBadge}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />
      {q.hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => q.fetchNextPage()}
            disabled={q.isFetchingNextPage}
            className="px-4 py-2 rounded border"
          >
            {q.isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
