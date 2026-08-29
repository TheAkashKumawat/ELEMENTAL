'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FilterSidebar, FilterState } from '@/components/product/FilterSidebar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { PRODUCTS } from '@/lib/data/products';
import { SlidersHorizontal, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: undefined,
    minPrice: 0,
    maxPrice: 40000,
    selectedColors: [],
    selectedSizes: [],
    inStockOnly: false,
  });

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }

    list = list.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.selectedColors.length > 0) {
      list = list.filter((p) =>
        p.availableColors?.some((c) => filters.selectedColors.includes(c.name))
      );
    }

    if (filters.selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.availableSizes?.some((s) => filters.selectedSizes.includes(s))
      );
    }

    if (filters.inStockOnly) {
      list = list.filter((p) =>
        p.variants.some((v) => v.inventoryQuantity > 0)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
        break;
    }

    return list;
  }, [filters, sortBy]);

  // Simulate quick transition state for smoothness
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 40000 ? 1 : 0) +
    filters.selectedColors.length +
    filters.selectedSizes.length +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="mb-10 text-center sm:text-left border-b border-stone-200/80 pb-8">
          <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">
            Complete Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-950 mt-1 mb-3">
            All Creations
          </h1>
          <p className="text-sm text-stone-500 max-w-2xl">
            Explore 24 foundational pieces spanning botanical knitwear, bench-made bio-footwear, plant bio-leather goods, and monolithic living objects.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200/60">
          
          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            <span className="text-xs text-stone-500 font-mono">
              Showing {filteredProducts.length} of {PRODUCTS.length} pieces
            </span>
          </div>

          {/* Right Controls: Sort & Grid Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-9 pl-3 pr-8 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-900 appearance-none focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-md border border-stone-200">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'grid' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-400 hover:text-stone-700'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'list' ? 'bg-white text-stone-950 shadow-2xs' : 'text-stone-400 hover:text-stone-700'
                )}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Main Content Layout (Sidebar + Products Grid) */}
        <div className="flex gap-10">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpenMobile={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              viewMode={viewMode}
              columns={3}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
