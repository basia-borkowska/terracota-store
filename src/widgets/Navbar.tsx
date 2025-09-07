import { ShoppingCart, Heart, Search, Columns } from 'lucide-react';
import { Button } from '../shared/ui/atoms/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pathnames } from '../shared/lib/pathnames';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 sticky top-0 left-0 h-14 py-4 px-8 w-full flex items-center justify-between">
      {/* TODO add logo */}
      <button
        className="text-amber-700 font-bold text-lg"
        onClick={() => navigate(pathnames.home)}
      >
        Terracota
      </button>
      <div className="flex gap-10">
        {/* TODO add links */}
        <span className="hover:cursor-pointer text-primary hover:opacity-50">
          {t('navbar.newIn')}
        </span>
        <span className="hover:cursor-pointer text-primary hover:opacity-50">
          {t('navbar.products')}
        </span>
        <span className="hover:cursor-pointer text-primary hover:opacity-50">
          {t('navbar.inspirations')}
        </span>
      </div>
      <div className="flex gap-3">
        <Button variant="icon" size="icon">
          <Search />
        </Button>
        <Button
          variant="icon"
          size="icon"
          onClick={() => navigate(pathnames.compare)}
        >
          <Columns />
        </Button>
        <Button
          variant="icon"
          size="icon"
          onClick={() => navigate(pathnames.wishList)}
        >
          <Heart />
        </Button>
        <Button
          variant="icon"
          size="icon"
          onClick={() => navigate(pathnames.checkout.root)}
        >
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
