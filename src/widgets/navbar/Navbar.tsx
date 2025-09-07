import { ShoppingCart, Heart, Search, Columns } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathnames } from '../../shared/lib/pathnames';
import { useScrollY } from '../../shared/hooks/useScrollY';
import { cn } from '../../shared/lib/utils';
import NavbarLink from './NavbarLink';
import NavbarAction from './NavbarAction';

const Y_SCROLL_THRESHOLD = 24;

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const y = useScrollY();

  const transparentNavbar =
    y <= Y_SCROLL_THRESHOLD && location.pathname === pathnames.home;

  return (
    <nav
      className={cn(
        ' bg-blue-50 z-50 sticky top-0 transition-colors duration-700 left-0 h-14 py-4 px-8 w-full flex items-center justify-between',
        { 'bg-transparent': transparentNavbar }
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
        {/* TODO add links */}
        <NavbarLink
          transparentNavbar={transparentNavbar}
          to={pathnames.notFound}
        >
          {t('navbar.newIn')}
        </NavbarLink>
        <NavbarLink
          transparentNavbar={transparentNavbar}
          to={pathnames.products}
        >
          {t('navbar.products')}
        </NavbarLink>
        <NavbarLink
          transparentNavbar={transparentNavbar}
          to={pathnames.notFound}
        >
          {t('navbar.inspirations')}
        </NavbarLink>
      </div>
      <div className="flex gap-3">
        <NavbarAction
          transparentNavbar={transparentNavbar}
          to={pathnames.products}
        >
          <Search />
        </NavbarAction>
        <NavbarAction
          transparentNavbar={transparentNavbar}
          to={pathnames.compare}
        >
          <Columns />
        </NavbarAction>
        <NavbarAction
          transparentNavbar={transparentNavbar}
          to={pathnames.wishList}
        >
          <Heart />
        </NavbarAction>
        <NavbarAction
          transparentNavbar={transparentNavbar}
          to={pathnames.checkout.root}
        >
          <ShoppingCart />
        </NavbarAction>
      </div>
    </nav>
  );
};

export default Navbar;
