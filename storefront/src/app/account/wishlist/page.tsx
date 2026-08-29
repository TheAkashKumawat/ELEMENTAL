'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { PRODUCTS } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Heart, Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { StockStatusBadge } from '@/components/ui/Badge';

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: typeof PRODUCTS[0]) => {
    const firstInStockVariant = product.variants.find((v) => v.inventoryQuantity > 0) || product.variants[0];
    const res = addItem(product, firstInStockVariant, 1);
    if (res.success) {
      removeFromWishlist(product.id);
      showToast(`Moved ${product.title} to your bag`);
    } else {
      showToast(res.message, 'error');
    }
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-950 mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
          Save your favorite artifacts while browsing to review or purchase later.
        </p>
        <Link href="/products">
          <Button size="md">Browse Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-stone-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <Link href="/account" className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mb-2">
              <ChevronLeft className="w-4 h-4" /> Back to Account Overview
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-950">
              Curated Wishlist ({savedProducts.length})
            </h1>
          </div>

          <button
            onClick={() => {
              clearWishlist();
              showToast('Wishlist cleared');
            }}
            className="text-xs text-stone-400 hover:text-rose-600 font-medium"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedProducts.map((p) => {
            const totalStock = p.variants.reduce((s, v) => s + v.inventoryQuantity, 0);
            const isOutOfStock = totalStock <= 0;

            return (
              <div
                key={p.id}
                className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden mb-3">
                    <Link href={`/products/${p.handle}`} className="block w-full h-full">
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <button
                      onClick={() => {
                        removeFromWishlist(p.id);
                        showToast(`Removed ${p.title} from wishlist`);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-stone-400 hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>{p.categoryName}</span>
                      <StockStatusBadge quantity={totalStock} size="sm" />
                    </div>
                    <Link href={`/products/${p.handle}`}>
                      <h3 className="text-sm font-medium text-stone-900 line-clamp-1 hover:text-stone-600">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-semibold font-mono text-stone-900">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <Button
                    size="sm"
                    variant={isOutOfStock ? 'secondary' : 'primary'}
                    disabled={isOutOfStock}
                    onClick={() => handleMoveToCart(p)}
                    className="w-full text-xs uppercase tracking-wider font-semibold"
                    leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                  >
                    {isOutOfStock ? 'Sold Out' : 'Move to Bag'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
