import type { Product } from '../../entities/product/types';
import { cn } from '../../shared/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../shared/ui/molecules/Carousel';
import ProductCard from '../ProductCard';

interface ProductsCarouselProps {
  products: Product[];
  title?: string;
  className?: string;
  cardProps?: {
    showNewBadge?: boolean;
    showDiscountBadge?: boolean;
  };
  itemWidthClass?: string;
}

const ProductsCarousel = ({
  products,
  title,
  className,
  cardProps,
  itemWidthClass = 'w-64',
}: ProductsCarouselProps) => {
  if (!products?.length) return null;

  return (
    <section className={className}>
      {title && <h2 className="text-xl font-medium mb-2">{title}</h2>}
      <Carousel>
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem
              key={p.id}
              className={cn(
                'sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
                itemWidthClass
              )}
            >
              <ProductCard
                product={p}
                showNewBadge={cardProps?.showNewBadge ?? true}
                showDiscountBadge={cardProps?.showDiscountBadge ?? true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default ProductsCarousel;
