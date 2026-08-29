'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
  Check,
  Truck,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingTotal,
    getTaxTotal,
    getGrandTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    promoError,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const { showToast } = useToast();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingTotal();
  const tax = getTaxTotal();
  const grandTotal = getGrandTotal();

  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const ok = applyPromo(promoCode);
    if (ok) {
      showToast(`Promo code ${promoCode.toUpperCase()} applied!`);
      setPromoCode('');
    } else {
      showToast('Invalid promotional code', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6 text-stone-400">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="text-3xl font-serif font-light text-stone-950 mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven&apos;t added any pieces yet. Explore our curated seasonal releases in apparel, footwear, and home living.
        </p>
        <Link href="/products">
          <Button size="lg" className="px-8 shadow-md">
            Discover Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
          <div>
            <h1 className="text-3xl font-serif font-light text-stone-950">
              Shopping Bag
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-mono">
              {items.reduce((s, i) => s + i.quantity, 0)} Items Selected
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-stone-400 hover:text-rose-600 font-medium transition-colors"
          >
            Clear Bag
          </button>
        </div>

        {/* Free Shipping Gauge */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-8">
          <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
            <span className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-stone-900" />
              {amountToFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold">
                  You have unlocked Complimentary Pan-India Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-stone-900 font-semibold font-mono">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more to qualify for Free Delivery
                </span>
              )}
            </span>
            <span className="text-stone-500 font-medium font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-stone-950 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Grid: Items (8 cols) + Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 divide-y divide-stone-200 border-t border-b border-stone-200">
            {items.map((item) => (
              <div key={item.variantId} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                
                {/* Product info */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    href={`/products/${item.handle}`}
                    className="relative w-20 h-24 sm:w-24 sm:h-28 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <Link
                      href={`/products/${item.handle}`}
                      className="text-base font-medium text-stone-900 hover:text-stone-600 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-stone-500 font-mono">
                      {item.variantTitle}
                    </p>
                    <p className="text-xs font-semibold text-stone-900 font-mono">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>

                {/* Controls (Quantity & Line Total) */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity */}
                  <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 h-10 px-1">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-1 text-stone-500 hover:text-stone-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-stone-900 font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-20">
                    <span className="text-base font-semibold text-stone-950 font-mono">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-stone-400 hover:text-rose-600 p-2 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Order Summary Box (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 sticky top-28">
              <h3 className="text-base font-serif font-semibold text-stone-900 uppercase tracking-wider">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-stone-300 rounded-md uppercase placeholder:normal-case focus:outline-none focus:border-stone-900"
                  />
                </div>
                <Button type="submit" size="sm" variant="outline" className="h-9">
                  Apply
                </Button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                  <span className="flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {appliedPromo.code} ({appliedPromo.discountPercent}% Off)
                  </span>
                  <button
                    onClick={removePromo}
                    className="text-emerald-700 hover:text-emerald-950 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && <p className="text-xs text-rose-600">{promoError}</p>}

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-mono font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-stone-900 font-mono font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (12%)</span>
                  <span className="text-stone-900 font-mono font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-950 pt-4 border-t border-stone-200">
                  <span>Total</span>
                  <span className="font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block w-full">
                <Button
                  size="lg"
                  className="w-full shadow-lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout • ₹{grandTotal.toLocaleString('en-IN')}
                </Button>
              </Link>

              {/* Assurances */}
              <div className="space-y-2 pt-2 text-[11px] text-stone-500 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-stone-700" />
                  <span>256-bit encrypted secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Complimentary returns within 30 days</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
