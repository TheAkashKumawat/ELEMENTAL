'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDiscountAmount,
    getShippingTotal,
    getGrandTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    promoError,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const { showToast } = useToast();

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingTotal();
  const grandTotal = getGrandTotal();
  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      showToast(`Promo code ${promoInput.toUpperCase()} applied!`);
      setPromoInput('');
    } else {
      showToast('Invalid promotional code', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-base font-medium text-stone-900 tracking-wide uppercase">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-stone-100/80 px-6 py-3 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-stone-900" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-semibold">You unlocked Free Express Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-stone-900 font-semibold font-mono">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-stone-500 font-medium font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Body / Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-1">Your bag is empty</h3>
                <p className="text-sm text-stone-500 mb-6 max-w-xs">
                  Explore our curated seasonal collection of apparel, footwear, and objects.
                </p>
                <Button
                  onClick={closeCart}
                  className="w-full max-w-xs"
                >
                  <Link href="/products" className="w-full">
                    Discover Collection
                  </Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="py-4 flex gap-4 group">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 bg-stone-100 rounded-md overflow-hidden shrink-0 border border-stone-200"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-stone-900 hover:text-stone-600 line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {item.variantTitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-stone-900 font-mono">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/50 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. WELCOME10)"
                    className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-stone-300 rounded-md uppercase placeholder:normal-case focus:outline-none focus:border-stone-900"
                  />
                </div>
                <Button type="submit" size="sm" variant="outline" className="h-9">
                  Apply
                </Button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                  <span className="flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {appliedPromo.code}: {appliedPromo.description}
                  </span>
                  <button
                    onClick={removePromo}
                    className="text-emerald-700 hover:text-emerald-950 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-xs text-rose-600">{promoError}</p>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1 font-mono">
                <div className="flex justify-between font-sans">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-medium font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium font-sans">
                    <span>Discount</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans">
                  <span>Delivery</span>
                  <span className="text-stone-900 font-medium font-mono">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200 font-sans">
                  <span>Total</span>
                  <span className="font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Checkout • ₹{grandTotal.toLocaleString('en-IN')}
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block w-full text-center">
                  <Button variant="ghost" size="sm" className="w-full text-xs text-stone-600">
                    View Full Bag Details
                  </Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
