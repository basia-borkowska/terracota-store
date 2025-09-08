import { NavLink } from 'react-router-dom';
import { pathnames } from '../../lib/pathnames';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

type Crumb = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  trail: Crumb[];
  className?: string;
};

export const Breadcrumbs = ({ trail, className }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const base: Crumb[] = [
    { label: t('common.home'), to: pathnames.home },
    { label: t('common.products'), to: pathnames.products },
  ];

  const crumbs = [...base, ...trail];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm text-dark', className)}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {crumb.to && !isLast ? (
              <NavLink
                to={crumb.to}
                className="hover:underline hover:text-interactive"
              >
                {crumb.label}
              </NavLink>
            ) : (
              <span className={isLast ? 'font-medium text-dark' : ''}>
                {crumb.label}
              </span>
            )}
            {!isLast && <span className="text-dark">/</span>}
          </span>
        );
      })}
    </nav>
  );
};
