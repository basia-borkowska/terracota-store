import { ShoppingCart, Heart, Search, Columns } from 'lucide-react';
import { Button } from '../shared/ui/atoms/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pathnames } from '../shared/lib/pathnames';
import { useScrollY } from '../shared/hooks/useScrollY';
import { cn } from '../shared/lib/utils';

const Y_SCROLL_THRESHOLD = 24;

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const y = useScrollY();
  const scrolled = y > Y_SCROLL_THRESHOLD;

  return (
    <div
      className={cn(
        'bg-transparent z-50 sticky top-0 transition-colors duration-700 left-0 h-14 py-4 px-8 w-full flex items-center justify-between',
        { 'bg-blue-50': scrolled }
      )}
    >
      {/* TODO add logo */}
      <button
        className="text-amber-700 font-bold text-lg"
        onClick={() => navigate(pathnames.home)}
      >
        Terracota
      </button>
      <div className="flex gap-10">
        {/* TODO add links and extract as components */}
        <span
          className={cn(
            'hover:cursor-pointer transition-colors duration-700 hover:opacity-50',
            {
              'text-primary': scrolled,
              'text-primary-foreground': !scrolled,
            }
          )}
        >
          {t('navbar.newIn')}
        </span>
        <span
          className={cn(
            'hover:cursor-pointer transition-colors duration-700 hover:opacity-50',
            {
              'text-primary': scrolled,
              'text-primary-foreground': !scrolled,
            }
          )}
        >
          {t('navbar.products')}
        </span>
        <span
          className={cn(
            'hover:cursor-pointer transition-colors duration-700 hover:opacity-50',
            {
              'text-primary': scrolled,
              'text-primary-foreground': !scrolled,
            }
          )}
        >
          {t('navbar.inspirations')}
        </span>
      </div>
      <div className="flex gap-3">
        <Button
          variant="unstyled"
          size="icon"
          className={cn('transition-colors duration-700 hover:opacity-50', {
            'text-primary': scrolled,
            'text-primary-foreground': !scrolled,
          })}
        >
          <Search />
        </Button>
        <Button
          variant="unstyled"
          size="icon"
          className={cn('transition-colors duration-700 hover:opacity-50', {
            'text-primary': scrolled,
            'text-primary-foreground': !scrolled,
          })}
          onClick={() => navigate(pathnames.compare)}
        >
          <Columns />
        </Button>
        <Button
          variant="unstyled"
          size="icon"
          className={cn('transition-colors duration-700 hover:opacity-50', {
            'text-primary': scrolled,
            'text-primary-foreground': !scrolled,
          })}
          onClick={() => navigate(pathnames.wishList)}
        >
          <Heart />
        </Button>
        <Button
          variant="unstyled"
          size="icon"
          className={cn('transition-colors duration-700 hover:opacity-50', {
            'text-primary': scrolled,
            'text-primary-foreground': !scrolled,
          })}
          onClick={() => navigate(pathnames.checkout.root)}
        >
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
