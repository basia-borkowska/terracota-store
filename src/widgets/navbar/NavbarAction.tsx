import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/lib/utils';
import { Button } from '../../shared/ui/atoms/Button';

interface NavbarActionProps {
  children: React.ReactNode;
  transparentNavbar: boolean;
  to: string;
}

const NavbarAction = ({
  to,
  transparentNavbar,
  children,
}: NavbarActionProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="unstyled"
      size="icon"
      className={cn('transition-colors duration-700 hover:opacity-50', {
        'text-primary': !transparentNavbar,
        'text-primary-foreground': transparentNavbar,
      })}
      onClick={() => navigate(to)}
    >
      {children}
    </Button>
  );
};

export default NavbarAction;
