'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, CornerDownLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/data/categories';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);

    setResults(filtered);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-stone-200 animate-slideDown">
        
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center px-4 border-b border-stone-200">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for bamboo silk, sneakers, lamps, linen..."
            className="w-full h-14 px-3.5 bg-transparent text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="submit"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-600 rounded text-xs font-medium hover:bg-stone-200 transition-colors"
          >
            <span>Search</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="space-y-6">
              {/* Popular Categories */}
              <div>
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                  Browse by Category
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.handle}`}
                      onClick={onClose}
                      className="p-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-center transition-colors border border-stone-200/60 group"
                    >
                      <span className="text-xs font-medium text-stone-800 group-hover:text-stone-950">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div>
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Trending Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Bamboo Silk Crewneck', 'Bio-Leather Court Sneaker', 'Stoneware Arch Vase', 'Belgian Linen Throw', 'Raw Selvedge Denim'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 rounded-full text-xs font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
                <span>{results.length} quick matches</span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="text-stone-900 font-semibold hover:underline flex items-center gap-1"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="divide-y divide-stone-100">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 py-2.5 hover:bg-stone-50 rounded-lg px-2 -mx-2 transition-colors group"
                  >
                    <div className="relative w-12 h-14 bg-stone-100 rounded overflow-hidden shrink-0">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{product.categoryName}</p>
                      <h5 className="text-sm font-medium text-stone-900 truncate group-hover:text-stone-600">
                        {product.title}
                      </h5>
                      <p className="text-xs font-semibold text-stone-800 mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-700 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 hover:text-stone-600 py-1"
                >
                  <span>See full search results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <p className="text-sm font-medium text-stone-900 mb-1">No products found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
                Check for typos or try searching for general terms like apparel, footwear, vase, or watch.
              </p>
              <button
                onClick={() => setQuery('')}
                className="text-xs font-semibold text-stone-900 underline"
              >
                Clear query
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
