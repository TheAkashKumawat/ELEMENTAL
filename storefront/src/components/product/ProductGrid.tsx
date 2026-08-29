'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  viewMode = 'grid',
  columns = 4,
}) => {
  if (isLoading) {
    return (
      <div
        className={clsx(
          'grid gap-x-6 gap-y-10',
          columns === 4 && 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          columns === 3 && 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
          columns === 2 && 'grid-cols-2'
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50/50 p-8">
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900 mb-1">No items match your criteria</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
          Try resetting your price or variant filters to view other available pieces in this collection.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12',
        columns === 4 && 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        columns === 3 && 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
        columns === 2 && 'grid-cols-2'
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  );
};
