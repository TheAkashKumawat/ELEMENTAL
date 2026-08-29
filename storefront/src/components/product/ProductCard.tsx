'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useToast } from '@/components/ui/Toast';
import { StockStatusBadge } from '@/components/ui/Badge';
import { clsx } from 'clsx';

export interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const [currentImage, setCurrentImage] = useState(product.thumbnail);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const totalStock = product.variants.reduce((sum, v) => sum + v.inventoryQuantity, 0);
  const isOutOfStock = totalStock <= 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(
      added ? `Added ${product.title} to wishlist` : `Removed from wishlist`,
      'info'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    // Pick first in-stock variant
    const firstInStockVariant = product.variants.find((v) => v.inventoryQuantity > 0) || product.variants[0];
    setIsAdding(true);
    const result = addItem(product, firstInStockVariant, 1);

    if (result.success) {
      showToast(`Added ${product.title} to your bag`);
    } else {
      showToast(result.message, 'error');
    }

    setTimeout(() => setIsAdding(false), 800);
  };

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-white rounded-xl border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all group">
        {/* Image */}
        <Link
          href={`/products/${product.handle}`}
          className="relative w-full sm:w-56 aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden shrink-0"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
              Sale
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-stone-400 uppercase tracking-widest font-medium">
                {product.categoryName}
              </span>
              <button
                onClick={handleWishlist}
                className="text-stone-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Wishlist toggle"
              >
                <Heart className={clsx('w-4 h-4', isFavorited && 'fill-rose-600 text-rose-600')} />
              </button>
            </div>

            <Link href={`/products/${product.handle}`}>
              <h3 className="text-base sm:text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors mt-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                {product.availableColors.map((color) => (
                  <span
                    key={color.name}
                    title={color.name}
                    className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
                <span className="text-[11px] text-stone-400 ml-1">
                  {product.availableColors.length} colors
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-stone-900 font-mono">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <StockStatusBadge quantity={totalStock} className="ml-2" />
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="px-4 py-2 bg-stone-950 text-white rounded-md text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              {isAdding ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images[1]) setCurrentImage(product.images[1]);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(product.thumbnail);
      }}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/5] w-full bg-stone-100 rounded-lg overflow-hidden border border-stone-200/70">
        <Link href={`/products/${product.handle}`} className="block w-full h-full">
          <Image
            src={currentImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.originalPrice && (
            <span className="bg-stone-900 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
              Sale
            </span>
          )}
          {product.isNew && !product.originalPrice && (
            <span className="bg-white/90 backdrop-blur-xs text-stone-900 border border-stone-200 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 shadow-sm transition-all hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart className={clsx('w-4 h-4', isFavorited && 'fill-rose-600 text-rose-600')} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div
          className={clsx(
            'absolute inset-x-3 bottom-3 transition-all duration-300 z-10',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          )}
        >
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="w-full py-2.5 bg-stone-950/95 backdrop-blur-xs text-white text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-stone-900 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transition-all flex items-center justify-center gap-1.5"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : isOutOfStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 flex flex-col space-y-1">
        <div className="flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-wider font-medium">
          <span>{product.categoryName}</span>
          <StockStatusBadge quantity={totalStock} size="sm" />
        </div>

        <Link href={`/products/${product.handle}`}>
          <h3 className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Price & Swatches */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-sm font-semibold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color swatch dots */}
          {product.availableColors && product.availableColors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.availableColors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.availableColors.length > 3 && (
                <span className="text-[10px] text-stone-400 font-mono">
                  +{product.availableColors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
