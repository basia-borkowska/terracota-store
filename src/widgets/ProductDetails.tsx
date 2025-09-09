import { useTranslation } from 'react-i18next';
import type { ProductSummary } from '../entities/product/types';
import DiscountBadge from '../shared/ui/atoms/DiscountBadge';
import NewInBadge from '../shared/ui/atoms/NewInBadge';
import Price from '../shared/ui/molecules/Price';
import { Button } from '../shared/ui/atoms/Button';
import WishListButton from '../features/wishlist/ui/WishListButton';

interface ProductDetailsProps {
  product: ProductSummary;
  onAddToCart: (productId: string) => void;
}

const ProductDetails = ({ product, onAddToCart }: ProductDetailsProps) => {
  const { t } = useTranslation();

  const { id, discountedPrice, isNew, price, currency, description, title } =
    product;
  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mb-2">
        {discountedPrice && <DiscountBadge className="w-fit" />}
        {isNew && <NewInBadge className="w-fit" />}
      </div>

      <h1 className="text-3xl font-medium mb-4">{title}</h1>
      <p className="mb-6 text-sm">{description}</p>

      <Price
        price={price}
        discountedPrice={discountedPrice}
        currency={currency}
      />

      <div className="mt-8 flex items-center gap-2">
        <Button className="flex-1" onClick={() => onAddToCart(id)}>
          {t('widgets.productDetails.addToCart')}
        </Button>

        <WishListButton productId={id} variant="secondary" />
      </div>
    </div>
  );
};

export default ProductDetails;
