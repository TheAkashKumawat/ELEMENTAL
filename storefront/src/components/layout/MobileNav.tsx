'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight, ShoppingBag, Heart, User, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { wishlistIds } = useWishlistStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 flex flex-col justify-between p-6 animate-slideRight">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-100">
            <Link
              href="/"
              onClick={onClose}
              className="text-lg font-serif font-bold tracking-[0.2em] text-stone-950 uppercase"
            >
              ELEMENTAL
            </Link>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full h-10 px-3 bg-stone-100 rounded-md text-xs text-stone-500 flex items-center justify-between hover:bg-stone-200/70 transition-colors"
            >
              <span>Search products...</span>
              <span className="text-[10px] bg-stone-200 px-1.5 py-0.5 rounded text-stone-600 font-mono">⌘K</span>
            </button>
          </div>

          {/* Primary Navigation Links */}
          <div className="py-6 space-y-4">
            <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
              Collections
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="/products"
                onClick={onClose}
                className="text-base font-medium text-stone-900 hover:text-stone-600 flex items-center justify-between"
              >
                <span>All Products</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.handle}`}
                  onClick={onClose}
                  className="text-base font-medium text-stone-800 hover:text-stone-600 flex items-center justify-between pl-2 border-l-2 border-transparent hover:border-stone-900 transition-all"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-stone-400">({cat.productCount})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Account / Wishlist shortcuts */}
          <div className="py-4 border-t border-stone-100 space-y-3">
            <Link
              href="/account/wishlist"
              onClick={onClose}
              className="flex items-center justify-between text-sm font-medium text-stone-800 hover:text-stone-950"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-stone-500" />
                Wishlist
              </span>
              <span className="text-xs px-2 py-0.5 bg-stone-100 rounded-full font-semibold">
                {wishlistIds.length}
              </span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-stone-800 hover:text-stone-950"
            >
              <User className="w-4 h-4 text-stone-500" />
              Client Account
            </Link>
          </div>
        </div>

        {/* Bottom Static Links */}
        <div className="pt-6 border-t border-stone-100 text-xs text-stone-500 space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/about" onClick={onClose} className="hover:text-stone-900">About</Link>
            <Link href="/contact" onClick={onClose} className="hover:text-stone-900">Contact</Link>
            <Link href="/faq" onClick={onClose} className="hover:text-stone-900">FAQ</Link>
            <Link href="/shipping" onClick={onClose} className="hover:text-stone-900">Shipping</Link>
          </div>
          <p className="text-[10px] text-stone-400 pt-2">
            © 2026 ELEMENTAL India Private Limited.
          </p>
        </div>
      </div>
    </div>
  );
};
