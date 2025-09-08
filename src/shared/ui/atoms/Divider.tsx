import { cn } from '../../lib/utils';

type DividerProps = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export const Divider = ({
  className,
  orientation = 'horizontal',
}: DividerProps) => (
  <div
    className={cn(
      'bg-dark/10',
      orientation === 'horizontal' ? 'w-full h-px ' : 'h-full w-px',
      className
    )}
  />
);
