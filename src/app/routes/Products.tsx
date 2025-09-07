import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../shared/ui/atoms/Card';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import { useTranslation } from 'react-i18next';
import { fetchProductsPaginated } from '../../entities/product/api';
import { useIntersection } from '../../shared/hooks/useIntersection';

const PAGE_SIZE = 30;

const Products = () => {
  const { i18n } = useTranslation();

  const q = useInfiniteQuery({
    queryKey: ['products', i18n.language, PAGE_SIZE],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductsPaginated(pageParam as number, PAGE_SIZE, i18n.language),
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
    return <div className="p-6 text-red-600">Error: {String(q.error)}</div>;
  if (q.status === 'pending') return <div className="p-6">Loading...</div>;

  return (
    <PageWrapper>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full object-cover rounded-t-md"
            />
            <CardHeader className="text-xl font-medium">
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-lg font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
          </Card>
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
    </PageWrapper>
  );
};

export default Products;
