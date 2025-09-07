import { Button } from '../../shared/ui/atoms/Button';

interface NavbarActionProps {
  children: React.ReactNode;
  onClick: () => void;
}

const NavbarAction = ({ onClick, children }: NavbarActionProps) => (
  <Button
    variant="unstyled"
    size="icon"
    className="transition-colors duration-700 hover:opacity-50 group-data-[transparent=true]/nav:text-primary-foreground group-data-[transparent=false]/nav:text-primary"
    onClick={onClick}
  >
    {children}
  </Button>
);

export default NavbarAction;
