import { Link } from 'react-router-dom';

interface NavbarLinkProps {
  children: React.ReactNode;
  to: string;
}

const NavbarLink = ({ children, to }: NavbarLinkProps) => (
  <Link
    to={to}
    className="hover:cursor-pointer transition-colors duration-700 hover:opacity-50 group-data-[transparent=true]/nav:text-primary-foreground group-data-[transparent=false]/nav:text-primary"
  >
    {children}
  </Link>
);

export default NavbarLink;
