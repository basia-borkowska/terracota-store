import { ShoppingCart, Heart, Search, Columns } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathnames } from '../../shared/lib/pathnames';
import { useScrollY } from '../../shared/hooks/useScrollY';
import { cn } from '../../shared/lib/utils';
import NavbarLink from './NavbarLink';
import NavbarAction from './NavbarAction';
import NavbarLanguageSwitch from './NavbarLanguageSwitch';

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
      data-transparent={transparentNavbar ? 'true' : 'false'}
      className="group/nav data-[transparent=true]:bg-transparent data-[transparent=false]:bg-blue-50 z-50 sticky top-0 transition-colors duration-700 left-0 h-14 py-4 px-8 w-full flex items-center justify-between"
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
        <NavbarLink to={pathnames.notFound}>{t('navbar.newIn')}</NavbarLink>
        <NavbarLink to={pathnames.products}>{t('navbar.products')}</NavbarLink>
        <NavbarLink to={pathnames.notFound}>
          {t('navbar.inspirations')}
        </NavbarLink>
      </div>
      <div className="flex gap-3">
        <NavbarAction onClick={() => alert('implement search')}>
          <Search />
        </NavbarAction>
        <NavbarAction onClick={() => navigate(pathnames.compare)}>
          <Columns />
        </NavbarAction>
        <NavbarAction onClick={() => navigate(pathnames.wishList)}>
          <Heart />
        </NavbarAction>
        <NavbarAction onClick={() => navigate(pathnames.checkout.root)}>
          <ShoppingCart />
        </NavbarAction>

        <NavbarLanguageSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
