import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-[var(--color-navy-border)] bg-[var(--color-navy-base)] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-cyan-glow)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
