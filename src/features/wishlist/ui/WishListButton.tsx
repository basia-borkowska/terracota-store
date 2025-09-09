import { Heart } from 'lucide-react';
import { Button } from '../../../shared/ui/atoms/Button';
import { cn } from '../../../shared/lib/utils';
import { useWishList } from '../model/useWishList';

type WishListButtonProps = {
  productId: string;
  ariaLabel?: string;
  className?: string;
  variant?: 'unstyled' | 'secondary';
};
const WishListButton = ({
  productId,
  variant = 'unstyled',
  className,
}: WishListButtonProps) => {
  const { toggle, isFavourite } = useWishList();
  const isIconFilled = isFavourite(productId);

  //   TODO handle icon buttons better as a separate component
  return (
    <Button
      variant={variant}
      size="icon"
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        toggle(productId);
      }}
    >
      <Heart className={cn({ 'fill-current': isIconFilled })} />
    </Button>
  );
};

export default WishListButton;
