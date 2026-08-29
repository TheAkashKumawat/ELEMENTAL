'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryHandle } from '@/types';
import { clsx } from 'clsx';

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | CategoryHandle>('all');

  const filteredProducts =
    activeTab === 'all'
      ? PRODUCTS.filter((p) => p.isFeatured).slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  const tabs: { label: string; value: 'all' | CategoryHandle }[] = [
    { label: 'All Featured', value: 'all' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Footwear', value: 'footwear' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Home Living', value: 'home' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">
            Signature Artifacts
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-950 mt-1 mb-4">
            Curated Essentials
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Every piece is produced in limited capsule batches to guarantee generational durability and zero material waste.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={clsx(
                  'px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all focus:outline-none',
                  activeTab === tab.value
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} columns={4} />

        {/* View All Button */}
        <div className="text-center pt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold tracking-widest uppercase rounded-full transition-colors"
          >
            <span>View Full Spring/Summer Catalog (24 Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
