import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline' | 'dark';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium uppercase tracking-wider rounded-full';

  const variants = {
    default: 'bg-stone-100 text-stone-800 border border-stone-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    neutral: 'bg-stone-50 text-stone-600 border border-stone-200',
    outline: 'bg-transparent text-stone-800 border border-stone-300',
    dark: 'bg-stone-900 text-stone-100 border border-stone-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {children}
    </span>
  );
};

export const StockStatusBadge: React.FC<{
  quantity: number;
  size?: 'sm' | 'md';
  className?: string;
}> = ({ quantity, size = 'sm', className }) => {
  if (quantity <= 0) {
    return (
      <Badge variant="danger" size={size} className={className}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
        Sold Out
      </Badge>
    );
  }

  if (quantity <= 3) {
    return (
      <Badge variant="warning" size={size} className={className}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
        Only {quantity} Left
      </Badge>
    );
  }

  return (
    <Badge variant="success" size={size} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      In Stock
    </Badge>
  );
};
