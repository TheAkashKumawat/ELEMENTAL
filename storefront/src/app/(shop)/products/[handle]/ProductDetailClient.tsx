'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useToast } from '@/components/ui/Toast';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  ChevronRight,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = selectedVariant.inventoryQuantity <= 0;
  const maxStock = selectedVariant.inventoryQuantity;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    const res = addItem(product, selectedVariant, quantity);
    if (res.success) {
      showToast(`Added ${quantity} × ${product.title} to your bag`);
    } else {
      showToast(res.message, 'error');
    }
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    showToast(
      added ? `Added ${product.title} to wishlist` : `Removed from wishlist`,
      'info'
    );
  };

  const accordionItems = [
    {
      id: 'details',
      title: 'Architectural Details & Specifications',
      content: (
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
          {product.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'materials',
      title: 'Noble Materials & Composition',
      content: (
        <div className="space-y-2 text-xs text-stone-600">
          <p>{product.materials.join(', ')}</p>
          <p className="text-stone-500 italic">
            All materials are certified OEKO-TEX Standard 100 or GOTS organic, sourced directly from verified Indian and global mills.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Garment & Object Care',
      content: (
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
          {product.careInstructions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Complimentary Pan-India Delivery & 30-Day Returns',
      content: (
        <div className="space-y-2 text-xs text-stone-600">
          <p>
            Complimentary tracked express delivery across India on all orders over ₹1,999. Packaged in custom archival presentation boxes.
          </p>
          <p>
            We offer 30-day hassle-free returns on unworn items with original tags and packaging intact.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 font-medium">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-stone-900 transition-colors capitalize"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-800 font-semibold truncate max-w-xs sm:max-w-md">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Stage (Gallery + Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Right: Product Purchase Controls (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          
          {/* Header & Rating */}
          <div className="space-y-2 pb-6 border-b border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                {product.categoryName}
              </span>
              <a
                href="#reviews"
                className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 transition-colors"
              >
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={clsx(
                        'w-3.5 h-3.5',
                        i < Math.round(product.rating) ? 'fill-amber-400' : 'text-stone-200'
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold text-stone-900">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">({product.reviewCount} reviews)</span>
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-950 leading-tight">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-stone-500 font-light">
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-2 font-mono">
              <span className="text-2xl font-serif font-semibold text-stone-950">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-[10px] uppercase bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded">
                  Save ₹{(product.originalPrice - selectedVariant.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selector */}
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={(v) => {
              setSelectedVariant(v);
              setQuantity(1);
            }}
          />

          {/* Quantity and Add-to-Cart Action Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              
              {/* Quantity Changer */}
              <div className="flex items-center border border-stone-300 rounded-md bg-white h-12 px-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-1.5 text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-stone-900 font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="p-1.5 text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant={isOutOfStock ? 'secondary' : 'luxury'}
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex-1 h-12 text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-xl"
                rightIcon={
                  isAdding ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )
                }
              >
                {isAdding ? 'Added to Bag' : isOutOfStock ? 'Sold Out' : `Add to Bag • ₹${(selectedVariant.price * quantity).toLocaleString('en-IN')}`}
              </Button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="w-12 h-12 rounded-md border border-stone-300 flex items-center justify-center text-stone-700 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs"
                aria-label="Save to Wishlist"
              >
                <Heart className={clsx('w-5 h-5', isFavorited && 'fill-rose-600 text-rose-600')} />
              </button>

            </div>

            {/* Micro assurances */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-stone-500 text-center">
              <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-lg">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-lg">
                <RefreshCw className="w-4 h-4 text-stone-700" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-stone-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>Generational Craft</span>
              </div>
            </div>
          </div>

          {/* Collapsible Accordions for Specifications */}
          <div className="pt-4">
            <Accordion items={accordionItems} defaultOpenId="details" />
          </div>

        </div>

      </div>

      {/* Customer Reviews Section */}
      <ProductReviews
        reviews={product.reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* Related Creations Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">
                Harmonious Pairings
              </span>
              <h3 className="text-2xl font-serif font-light text-stone-950 mt-1">
                You May Also Admire
              </h3>
            </div>
            <Link
              href={`/category/${product.category}`}
              className="text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-stone-600"
            >
              View More
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}

      {/* Mobile Sticky Add to Bag Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-stone-900 truncate">{product.title}</p>
          <p className="text-xs text-stone-600 font-mono font-semibold">₹{selectedVariant.price.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleWishlistToggle}
            className="w-10 h-10 rounded-md border border-stone-300 flex items-center justify-center text-stone-700"
            aria-label="Save to Wishlist"
          >
            <Heart className={clsx('w-4 h-4', isFavorited && 'fill-rose-600 text-rose-600')} />
          </button>
          <Button
            variant={isOutOfStock ? 'secondary' : 'luxury'}
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="h-10 px-5 text-xs uppercase tracking-wider font-semibold shadow-md"
          >
            {isAdding ? 'Added' : isOutOfStock ? 'Sold Out' : 'Add to Bag'}
          </Button>
        </div>
      </div>

    </div>
  );
};
