import { useEffect, useState } from 'react';
import { fetchProducts } from '../../entities/product/api';
import type { Product } from '../../entities/product/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../shared/ui/atoms/Card';
import { PageWrapper } from '../../shared/ui/layout/PageWrapper';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((e) => {
        if (mounted) setError(String(e));
      });
    return () => {
      mounted = false;
    };
  }, [i18n.language]);

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <PageWrapper className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
      {items.map((product) => (
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
    </PageWrapper>
  );
};

export default Products;
