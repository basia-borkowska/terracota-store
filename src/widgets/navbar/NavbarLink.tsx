import { Link } from 'react-router-dom';
import { cn } from '../../shared/lib/utils';

interface NavbarLinkProps {
  transparentNavbar: boolean;
  children: React.ReactNode;
  to: string;
}

const NavbarLink = ({ transparentNavbar, children, to }: NavbarLinkProps) => (
  <Link
    to={to}
    className={cn(
      'hover:cursor-pointer transition-colors duration-700 hover:opacity-50',
      {
        'text-primary': !transparentNavbar,
        'text-primary-foreground': transparentNavbar,
      }
    )}
  >
    {children}
  </Link>
);

export default NavbarLink;
