import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-xl shadow-lg overflow-hidden relative',
          'before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/5 before:to-violet-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
