import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-cyan-900/40 text-cyan-50 border border-cyan-500/50 hover:bg-cyan-800/60 hover:glow-cyan focus-visible:ring-cyan-500': variant === 'primary',
            'bg-slate-800/60 text-slate-200 border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 focus-visible:ring-slate-500': variant === 'secondary',
            'bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white focus-visible:ring-slate-500': variant === 'ghost',
            'bg-red-950/40 text-red-200 border border-red-900/50 hover:bg-red-900/60 hover:border-red-500/50 focus-visible:ring-red-500': variant === 'danger',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
