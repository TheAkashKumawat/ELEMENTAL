'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export const CategoryTiles: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">
              Curated Universes
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-950 mt-1">
              Explore by Discipline
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-medium text-stone-900 hover:text-stone-600 flex items-center gap-1.5 uppercase tracking-wider group"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Category Tiles Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.handle}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 block shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

              <div className="absolute inset-x-3.5 sm:inset-x-5 bottom-3.5 sm:bottom-5 flex flex-col justify-end text-white">
                <span className="text-[10px] sm:text-[11px] text-stone-300 tracking-widest uppercase mb-0.5 font-mono">
                  0{CATEGORIES.indexOf(cat) + 1} • {cat.productCount} Items
                </span>
                <h3 className="text-base sm:text-xl font-serif font-medium tracking-wide group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <div className="pt-1 sm:pt-2 flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-amber-300 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
