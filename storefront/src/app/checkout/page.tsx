'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/useCartStore';
import { useOrderStore } from '@/lib/store/useOrderStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { ShippingAddress, ShippingOption } from '@/types';
import { SHIPPING_OPTIONS } from '@/lib/data/products';
import { CheckoutStepper, CheckoutStep } from '@/components/checkout/CheckoutStepper';
import { ShippingAddressForm } from '@/components/checkout/ShippingAddressForm';
import { DeliveryMethodSelector } from '@/components/checkout/DeliveryMethodSelector';
import { StripePaymentForm } from '@/components/checkout/StripePaymentForm';
import { OrderSummaryStep } from '@/components/checkout/OrderSummaryStep';
import { ShieldCheck, Lock, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getShippingTotal, getTaxTotal, getGrandTotal, clearCart } = useCartStore();
  const { createOrderFromCart } = useOrderStore();
  const { user } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');

  const defaultAddr: ShippingAddress = user?.savedAddresses[0] || {
    firstName: 'Rohan',
    lastName: 'Sharma',
    email: 'rohan.sharma@elemental.in',
    phone: '+91 98201 45678',
    address1: 'Flat 402, Sea Green Heights, Worli Sea Face',
    address2: 'Near Century Bazaar',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400018',
    country: 'India',
    province: 'Maharashtra',
    postalCode: '400018',
  };

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultAddr);
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [paymentDetails, setPaymentDetails] = useState<{ brand: string; last4: string }>({
    brand: 'RuPay / Visa',
    last4: '4242',
  });

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingTotal(selectedShippingOption.price);
  const tax = getTaxTotal();
  const grandTotal = getGrandTotal(selectedShippingOption.price);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-light text-stone-950 mb-2">No items to checkout</h2>
        <p className="text-xs text-stone-500 mb-6">Please add pieces to your bag before proceeding to checkout.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-stone-950 text-white rounded-md text-xs font-semibold uppercase tracking-wider"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const createdOrder = createOrderFromCart(
      items,
      shippingAddress,
      selectedShippingOption,
      subtotal,
      shipping,
      tax,
      discount,
      grandTotal
    );

    clearCart();
    router.push(`/checkout/confirmation?orderId=${createdOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-stone-50/40 pb-24">
      {/* Checkout Stepper Progress */}
      <CheckoutStepper
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Checkout Step Flow (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            {currentStep === 'shipping' && (
              <ShippingAddressForm
                address={shippingAddress}
                onChange={setShippingAddress}
                onSubmit={() => setCurrentStep('delivery')}
              />
            )}

            {currentStep === 'delivery' && (
              <DeliveryMethodSelector
                options={SHIPPING_OPTIONS}
                selectedOption={selectedShippingOption}
                onSelectOption={setSelectedShippingOption}
                onBack={() => setCurrentStep('shipping')}
                onNext={() => setCurrentStep('payment')}
                subtotal={subtotal}
              />
            )}

            {currentStep === 'payment' && (
              <StripePaymentForm
                onBack={() => setCurrentStep('delivery')}
                grandTotal={grandTotal}
                onSuccess={(details) => {
                  setPaymentDetails(details);
                  setCurrentStep('review');
                }}
              />
            )}

            {currentStep === 'review' && (
              <OrderSummaryStep
                items={items}
                shippingAddress={shippingAddress}
                shippingOption={selectedShippingOption}
                paymentDetails={paymentDetails}
                subtotal={subtotal}
                shippingTotal={shipping}
                discountTotal={discount}
                taxTotal={tax}
                grandTotal={grandTotal}
                onBack={() => setCurrentStep('payment')}
                onPlaceOrder={handlePlaceOrder}
                onEditStep={(step) => setCurrentStep(step)}
              />
            )}
          </div>

          {/* Right: Sticky Mini Cart Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Bag Summary ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>
                <Link href="/cart" className="text-xs text-stone-500 hover:text-stone-900 underline font-medium">
                  Edit Bag
                </Link>
              </div>

              {/* Item Previews */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="py-3 flex items-center gap-3.5">
                    <div className="relative w-12 h-14 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-stone-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {item.variantTitle} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-stone-900 font-mono">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-mono font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Savings</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({selectedShippingOption.name.split(' ')[0]})</span>
                  <span className="text-stone-900 font-mono font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (12%)</span>
                  <span className="text-stone-900 font-mono font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-950 pt-3 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-center gap-2 border-t border-stone-100">
                <Lock className="w-3.5 h-3.5 text-stone-600" />
                <span>Test Mode Simulation • Zero Real Charge</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
