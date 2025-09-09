// src/widgets/Footer/widgets.footer.tsx
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pathnames } from '../shared/lib/pathnames';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className=" bg-interactive text-sm">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-light mb-2">
            {t('widgets.footer.companyName')}
          </h2>
          <p className="mb-1 text-light">{t('widgets.footer.address')}</p>
          <p className="mb-1 text-light">{t('widgets.footer.city')}</p>
          <p className="mb-1 text-light">{t('widgets.footer.vat')}</p>
          <p className="text-light">{t('widgets.footer.email')}</p>
        </div>

        <div>
          <h3 className="font-semibold text-light mb-2">
            {t('widgets.footer.pages.title')}
          </h3>
          <ul className="space-y-1">
            <li>
              <NavLink
                to={pathnames.home}
                className="text-light hover:underline"
              >
                {t('widgets.footer.pages.home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={pathnames.products}
                className="text-light hover:underline"
              >
                {t('widgets.footer.pages.products')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={pathnames.newProducts}
                className="text-light hover:underline"
              >
                {t('widgets.footer.pages.newProducts')}
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-light mb-2">
            {t('widgets.footer.legal.title')}
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="/privacy" className="hover:underline text-light">
                {t('widgets.footer.legal.privacy')}
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline text-light">
                {t('widgets.footer.legal.terms')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-light">
        © {new Date().getFullYear()} {t('widgets.footer.companyName')}.{' '}
        {t('widgets.footer.copyright')}
      </div>
    </footer>
  );
};
