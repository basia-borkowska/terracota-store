import { useNavigate } from 'react-router-dom';
import type { Product } from '../entities/product/types';
import { cn } from '../shared/lib/utils';
import { Button } from '../shared/ui/atoms/Button';
import { Card, CardContent, CardTitle } from '../shared/ui/atoms/Card';
import DiscountBadge from '../shared/ui/atoms/DiscountBadge';
import NewInBadge from '../shared/ui/atoms/NewInBadge';
import { ImageWithFallback } from '../shared/ui/molecules/ImageWithFallback';
import Price from '../shared/ui/molecules/Price';
import { Heart } from 'lucide-react';
import { pathnames } from '../shared/lib/pathnames';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
  showNewBadge?: boolean;
  showDiscountBadge?: boolean;
}
const ProductCard = ({
  product,
  showNewBadge = true,
  showDiscountBadge = true,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const {
    discountedPrice,
    isNew,
    title,
    images,
    currency,
    price,
    id,
    isOnWishList,
  } = product;

  const mainImage = images[0];
  const hoverImage = images.length > 1 ? images[1] : null;

  useEffect(() => {
    if (hoverImage) {
      const img = new Image();
      img.src = hoverImage;
    }
  }, [hoverImage]);

  return (
    <Card
      key={id}
      className="relative group/card cursor-pointer"
      onClick={() => navigate(pathnames.product.replace(':id', id))}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-2 left-2 w-fit flex flex-col gap-2 z-10">
        {discountedPrice && showDiscountBadge && (
          <DiscountBadge className="w-fit" />
        )}
        {isNew && showNewBadge && <NewInBadge className="w-fit" />}
      </div>

      <Button
        variant="unstyled"
        size="icon"
        className="absolute top-1 right-1 z-10"
        onClick={(e) => {
          e.stopPropagation();
          alert('Implement add to wishlist');
        }}
      >
        <Heart className={cn({ 'fill-current': isOnWishList })} />
      </Button>

      <ImageWithFallback
        src={hovered && hoverImage ? hoverImage : mainImage}
        alt={title}
        className="w-full h-[350px]"
      />
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <Price
          currency={currency}
          price={price}
          discountedPrice={discountedPrice}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
