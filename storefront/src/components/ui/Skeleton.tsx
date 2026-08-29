import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(clsx('animate-pulse bg-stone-200/80 rounded-md', className))}
      {...props}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="space-y-2 pt-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
