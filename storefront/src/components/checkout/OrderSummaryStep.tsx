'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShippingAddress, ShippingOption, CartItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface OrderSummaryStepProps {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  paymentDetails: { brand: string; last4: string };
  subtotal: number;
  shippingTotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  onBack: () => void;
  onPlaceOrder: () => Promise<void>;
  onEditStep: (step: 'shipping' | 'delivery' | 'payment') => void;
}

export const OrderSummaryStep: React.FC<OrderSummaryStepProps> = ({
  items,
  shippingAddress,
  shippingOption,
  paymentDetails,
  subtotal,
  shippingTotal,
  discountTotal,
  taxTotal,
  grandTotal,
  onBack,
  onPlaceOrder,
  onEditStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleAuthorize = async () => {
    setIsSubmitting(true);
    try {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0A0A0A', '#D4AF37', '#C86D51', '#2D3B36'],
        });
      } catch {
        // Fallback if canvas is unavailable
      }
      await onPlaceOrder();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Review Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Shipping Address Box */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-200/80">
              <span className="font-semibold text-stone-900 uppercase tracking-wider">Shipping</span>
              <button
                type="button"
                onClick={() => onEditStep('shipping')}
                className="text-stone-500 hover:text-stone-900 underline font-medium"
              >
                Edit
              </button>
            </div>
            <p className="font-medium text-stone-900">{shippingAddress.firstName} {shippingAddress.lastName}</p>
            <p className="text-stone-600">{shippingAddress.address1} {shippingAddress.address2}</p>
            <p className="text-stone-600">{shippingAddress.city}, {shippingAddress.state || shippingAddress.province} - {shippingAddress.pinCode || shippingAddress.postalCode}</p>
            <p className="text-stone-600">{shippingAddress.country}</p>
          </div>
          <p className="text-[11px] text-stone-400 font-mono pt-1">{shippingAddress.phone}</p>
        </div>

        {/* Delivery Option Box */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-200/80">
              <span className="font-semibold text-stone-900 uppercase tracking-wider">Method</span>
              <button
                type="button"
                onClick={() => onEditStep('delivery')}
                className="text-stone-500 hover:text-stone-900 underline font-medium"
              >
                Edit
              </button>
            </div>
            <p className="font-medium text-stone-900">{shippingOption.name}</p>
            <p className="text-stone-600">{shippingOption.estimatedDays}</p>
          </div>
          <p className="text-[11px] text-stone-500 font-mono">
            {shippingTotal === 0 ? 'Complimentary' : `₹${shippingTotal.toLocaleString('en-IN')}`}
          </p>
        </div>

        {/* Payment Method Box */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-stone-200/80">
              <span className="font-semibold text-stone-900 uppercase tracking-wider">Payment</span>
              <button
                type="button"
                onClick={() => onEditStep('payment')}
                className="text-stone-500 hover:text-stone-900 underline font-medium"
              >
                Edit
              </button>
            </div>
            <p className="font-medium text-stone-900">{paymentDetails.brand} •••• {paymentDetails.last4}</p>
            <p className="text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Test Authorization Ready
            </p>
          </div>
          <p className="text-[11px] text-stone-400">100% GST invoice generated</p>
        </div>

      </div>

      {/* Itemized Cart Breakdown */}
      <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
          <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
            Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
          </h4>
        </div>
        <div className="divide-y divide-stone-100 px-6">
          {items.map((item) => (
            <div key={item.variantId} className="py-4 flex items-center gap-4">
              <div className="relative w-14 h-16 bg-stone-100 rounded-md overflow-hidden shrink-0 border border-stone-200">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-stone-900 truncate">{item.title}</h5>
                <p className="text-xs text-stone-500">{item.variantTitle} • Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-stone-900 font-mono">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms & Authorization CTA */}
      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-stone-900 border-stone-300 rounded focus:ring-stone-900"
          />
          <span>
            I agree to the <a href="/terms" target="_blank" className="underline text-stone-900">Terms of Sale</a> and confirm that this is a simulated Indian test transaction.
          </span>
        </label>

        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <Button variant="ghost" size="md" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Payment
          </Button>

          <Button
            size="lg"
            variant="luxury"
            isLoading={isSubmitting}
            disabled={!agreedToTerms}
            onClick={handleAuthorize}
            className="px-10 shadow-xl"
            leftIcon={<Lock className="w-4 h-4" />}
          >
            Authorize & Place Order • ₹{grandTotal.toLocaleString('en-IN')}
          </Button>
        </div>
      </div>
    </div>
  );
};
