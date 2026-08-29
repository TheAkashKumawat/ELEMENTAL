import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'luxury';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none tracking-wide';

    const variants = {
      primary:
        'bg-stone-900 text-white hover:bg-stone-800 shadow-sm focus-visible:ring-stone-950',
      secondary:
        'bg-stone-100 text-stone-900 hover:bg-stone-200 focus-visible:ring-stone-400',
      outline:
        'border border-stone-300 bg-transparent text-stone-900 hover:bg-stone-50 hover:border-stone-400 focus-visible:ring-stone-400',
      ghost:
        'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70 focus-visible:ring-stone-400',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      luxury:
        'bg-stone-950 text-stone-100 hover:bg-black border border-stone-800 shadow-md hover:shadow-lg',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs rounded-md gap-1.5',
      md: 'h-11 px-5 text-sm rounded-md gap-2',
      lg: 'h-13 px-8 text-base rounded-md gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-md',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
