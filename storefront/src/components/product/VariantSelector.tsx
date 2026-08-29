'use client';

import React from 'react';
import { Product, ProductVariant } from '@/types';
import { StockStatusBadge } from '@/components/ui/Badge';
import { clsx } from 'clsx';

export interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
}) => {
  const { availableColors, availableSizes, variants } = product;

  const currentColor = selectedVariant.options.color;
  const currentSize =
    selectedVariant.options.size ||
    selectedVariant.options.finish ||
    selectedVariant.options.fragrance;

  const handleColorChange = (colorName: string) => {
    // Find variant with this color and current size, or fallback to first variant with this color
    const matched =
      variants.find(
        (v) =>
          v.options.color === colorName &&
          (v.options.size === currentSize ||
            v.options.finish === currentSize ||
            v.options.fragrance === currentSize)
      ) || variants.find((v) => v.options.color === colorName);

    if (matched) onSelectVariant(matched);
  };

  const handleSizeChange = (sizeName: string) => {
    const matched =
      variants.find(
        (v) =>
          (v.options.size === sizeName ||
            v.options.finish === sizeName ||
            v.options.fragrance === sizeName) &&
          v.options.color === currentColor
      ) ||
      variants.find(
        (v) =>
          v.options.size === sizeName ||
          v.options.finish === sizeName ||
          v.options.fragrance === sizeName
      );

    if (matched) onSelectVariant(matched);
  };

  return (
    <div className="space-y-6">
      
      {/* Colors Selection */}
      {availableColors && availableColors.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs tracking-wider">
            <span className="font-medium text-stone-900 uppercase">
              Color: <strong className="font-semibold">{currentColor || availableColors[0].name}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {availableColors.map((color) => {
              const isSelected = currentColor === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={clsx(
                    'relative w-8 h-8 rounded-full p-0.5 transition-all focus:outline-none flex items-center justify-center',
                    isSelected
                      ? 'ring-2 ring-stone-950 ring-offset-2 scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  )}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className="w-full h-full rounded-full border border-stone-300 shadow-xs block"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size / Finish / Fragrance Selection */}
      {availableSizes && availableSizes.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs tracking-wider">
            <span className="font-medium text-stone-900 uppercase">
              Option: <strong className="font-semibold">{currentSize || availableSizes[0]}</strong>
            </span>
            <button
              type="button"
              className="text-[11px] text-stone-500 hover:text-stone-900 underline font-sans"
              onClick={() => alert('Sizing Guide: True to size tailored european fit.')}
            >
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = currentSize === size;
              // Check if this size is available for current color
              const matchingVar = variants.find(
                (v) =>
                  (v.options.size === size ||
                    v.options.finish === size ||
                    v.options.fragrance === size) &&
                  (!currentColor || v.options.color === currentColor)
              );
              const isOutOfStock = matchingVar ? matchingVar.inventoryQuantity <= 0 : false;

              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={clsx(
                    'h-10 px-4 rounded-md text-xs font-medium uppercase tracking-wider transition-all focus:outline-none border',
                    isSelected
                      ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400 hover:bg-stone-50',
                    isOutOfStock && !isSelected && 'opacity-40 line-through bg-stone-50 text-stone-400'
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Status Notification for Selected Variant */}
      <div className="pt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StockStatusBadge quantity={selectedVariant.inventoryQuantity} />
          <span className="text-xs text-stone-500 font-mono">
            SKU: {selectedVariant.sku}
          </span>
        </div>
      </div>

    </div>
  );
};
