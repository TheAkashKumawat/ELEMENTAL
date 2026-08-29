'use client';

import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { CategoryHandle } from '@/types';
import { CATEGORIES } from '@/lib/data/categories';
import { clsx } from 'clsx';

export interface FilterState {
  category?: CategoryHandle;
  minPrice: number;
  maxPrice: number;
  selectedColors: string[];
  selectedSizes: string[];
  inStockOnly: boolean;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  hideCategoryFilter?: boolean;
}

const AVAILABLE_COLORS = [
  { name: 'Oatmeal Heather', hex: '#D6CEBE' },
  { name: 'Obsidian Black', hex: '#161616' },
  { name: 'Pure White / Gum', hex: '#F5F5F0' },
  { name: 'Cognac Tan', hex: '#8B4513' },
  { name: 'Camel Tan', hex: '#B8976C' },
  { name: 'Eucalyptus Sage', hex: '#6B7A6E' },
  { name: 'Terracotta Sand', hex: '#C28265' },
  { name: 'Desert Sand', hex: '#C2AC93' },
];

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', '30', '32', '34', 'EU 41', 'EU 42', 'EU 43', 'One Size'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isOpenMobile = false,
  onCloseMobile,
  hideCategoryFilter = false,
}) => {
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 40000 ? 1 : 0) +
    filters.selectedColors.length +
    filters.selectedSizes.length +
    (filters.inStockOnly ? 1 : 0);

  const resetFilters = () => {
    onFilterChange({
      category: hideCategoryFilter ? filters.category : undefined,
      minPrice: 0,
      maxPrice: 40000,
      selectedColors: [],
      selectedSizes: [],
      inStockOnly: false,
    });
  };

  const toggleColor = (colorName: string) => {
    const exists = filters.selectedColors.includes(colorName);
    const updated = exists
      ? filters.selectedColors.filter((c) => c !== colorName)
      : [...filters.selectedColors, colorName];
    onFilterChange({ ...filters, selectedColors: updated });
  };

  const toggleSize = (size: string) => {
    const exists = filters.selectedSizes.includes(size);
    const updated = exists
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ ...filters, selectedSizes: updated });
  };

  const content = (
    <div className="space-y-8 text-left">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Section (if not locked to a specific category page) */}
      {!hideCategoryFilter && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
            Category
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({ ...filters, category: undefined })}
              className={clsx(
                'w-full text-left text-xs py-1 transition-colors flex items-center justify-between',
                !filters.category ? 'font-semibold text-stone-950' : 'text-stone-600 hover:text-stone-900'
              )}
            >
              <span>All Categories</span>
              {!filters.category && <Check className="w-3.5 h-3.5 text-stone-950" />}
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat.handle;
              return (
                <button
                  key={cat.id}
                  onClick={() => onFilterChange({ ...filters, category: cat.handle })}
                  className={clsx(
                    'w-full text-left text-xs py-1 transition-colors flex items-center justify-between',
                    isSelected ? 'font-semibold text-stone-950' : 'text-stone-600 hover:text-stone-900'
                  )}
                >
                  <span>{cat.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-stone-950" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-semibold uppercase tracking-wider text-stone-800">
            Price Range
          </h4>
          <span className="font-mono text-stone-600 font-semibold">
            ₹{filters.minPrice.toLocaleString('en-IN')} – ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="40000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) =>
            onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-950"
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-mono">
          <span>₹1,000</span>
          <span>₹20,000</span>
          <span>₹40,000+</span>
        </div>
      </div>

      {/* Color Filter Swatches */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
          Color Palette
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {AVAILABLE_COLORS.map((c) => {
            const isSelected = filters.selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className={clsx(
                  'h-8 rounded-md p-1 border flex items-center justify-center transition-all',
                  isSelected
                    ? 'border-stone-950 ring-1 ring-stone-950 bg-stone-100 shadow-xs'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                )}
              >
                <span
                  className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs block"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
          Sizes & Dimensions
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((sz) => {
            const isSelected = filters.selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                className={clsx(
                  'px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider rounded border transition-colors',
                  isSelected
                    ? 'bg-stone-950 text-white border-stone-950'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                )}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Stock Only Toggle */}
      <div className="pt-2 border-t border-stone-200">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-900"
          />
        </label>
      </div>

    </div>
  );

  // Desktop Static Sidebar
  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 pr-8 border-r border-stone-200/80">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col p-6 overflow-y-auto animate-slideLeft">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase text-stone-900">
                Filter Products
              </span>
              <button onClick={onCloseMobile} className="p-1 text-stone-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="pt-8 mt-auto">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-stone-950 text-white rounded-md text-xs font-semibold uppercase tracking-wider"
              >
                Apply Filters ({activeFilterCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
