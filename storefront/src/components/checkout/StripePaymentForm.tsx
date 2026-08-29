'use client';

import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Info, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { STRIPE_TEST_CARDS } from '@/lib/stripe';
import { useToast } from '@/components/ui/Toast';
import { clsx } from 'clsx';

export interface StripePaymentFormProps {
  onBack: () => void;
  onSuccess: (paymentDetails: { brand: string; last4: string }) => void;
  grandTotal: number;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  onBack,
  onSuccess,
  grandTotal,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardholderName, setCardholderName] = useState('Rohan Sharma');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('321');
  const [upiId, setUpiId] = useState('rohansharma@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const handleFormatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handleFormatExpiry = (value: string) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (clean.length >= 2) {
      setExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    } else {
      setExpiry(clean);
    }
  };

  const handleFillTestCard = (card: typeof STRIPE_TEST_CARDS[0]) => {
    setCardNumber(card.rawNumber.replace(/(\d{4})/g, '$1 ').trim());
    setExpiry(card.exp);
    setCvc(card.cvc);
    showToast(`Loaded ${card.type}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvc)) {
      showToast('Please complete all card details', 'error');
      return;
    }
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      showToast('Please enter a valid UPI ID (e.g. name@upi)', 'error');
      return;
    }

    setIsProcessing(true);
    // Simulates secure payment tokenization
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === 'upi') {
        onSuccess({ brand: 'UPI', last4: upiId.split('@')[0] });
      } else {
        const cleanNum = cardNumber.replace(/\s+/g, '');
        const last4 = cleanNum.slice(-4) || '4242';
        const brand = cleanNum.startsWith('5') ? 'Mastercard' : 'RuPay / Visa';
        onSuccess({ brand, last4 });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      {/* Test Mode Banner */}
      <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Secure Indian Payment Gateway • Test Mode</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded font-bold">
            TEST MODE
          </span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Supports Credit/Debit Cards (RuPay, Visa, Mastercard) & Instant UPI in test mode. No actual charge will be made. Click any card preset below to auto-fill:
        </p>

        {/* Test Card Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {STRIPE_TEST_CARDS.map((tc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPaymentMethod('card');
                handleFillTestCard(tc);
              }}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/60 border border-amber-300 rounded text-[11px] font-mono text-amber-950 transition-colors shadow-2xs"
            >
              {tc.type}: {tc.number}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPaymentMethod('upi');
              setUpiId('elemental@upi');
              showToast('Loaded Test UPI ID');
            }}
            className="px-2.5 py-1 bg-white hover:bg-amber-100/60 border border-amber-300 rounded text-[11px] font-mono text-amber-950 transition-colors shadow-2xs"
          >
            UPI ID: elemental@upi
          </button>
        </div>
      </div>

      {/* Payment Method Switcher */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={clsx(
            'p-3.5 rounded-xl border-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all',
            paymentMethod === 'card'
              ? 'border-stone-950 bg-stone-900 text-white shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
          )}
        >
          <CreditCard className="w-4 h-4" />
          <span>Card / RuPay</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={clsx(
            'p-3.5 rounded-xl border-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all',
            paymentMethod === 'upi'
              ? 'border-stone-950 bg-stone-900 text-white shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
          )}
        >
          <Smartphone className="w-4 h-4" />
          <span>UPI / QR</span>
        </button>
      </div>

      {/* Credit / Debit Card Form */}
      {paymentMethod === 'card' ? (
        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-stone-700" />
              <span>Credit / Debit Card</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-70">
              <span className="px-1.5 py-0.5 bg-stone-100 text-[10px] font-mono rounded font-bold">RUPAY</span>
              <span className="px-1.5 py-0.5 bg-stone-100 text-[10px] font-mono rounded font-bold">VISA</span>
              <span className="px-1.5 py-0.5 bg-stone-100 text-[10px] font-mono rounded font-bold">MC</span>
            </div>
          </div>

          <Input
            label="Name on Card"
            required
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Rohan Sharma"
          />

          <Input
            label="Card Number"
            required
            maxLength={19}
            value={cardNumber}
            onChange={(e) => handleFormatCardNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            leftIcon={<CreditCard className="w-4 h-4" />}
            rightIcon={<Lock className="w-3.5 h-3.5 text-stone-400" />}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiration (MM/YY)"
              required
              maxLength={5}
              value={expiry}
              onChange={(e) => handleFormatExpiry(e.target.value)}
              placeholder="12/28"
            />
            <Input
              label="CVV / CVC"
              required
              maxLength={4}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="321"
              rightIcon={<Info className="w-3.5 h-3.5" />}
            />
          </div>
        </div>
      ) : (
        /* UPI Form */
        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Instant UPI Payment</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
              <span>Google Pay • PhonePe • Paytm</span>
            </div>
          </div>

          <Input
            label="Virtual Payment Address (UPI ID)"
            required
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="rohansharma@okhdfcbank"
            leftIcon={<Smartphone className="w-4 h-4" />}
          />

          <p className="text-xs text-stone-500">
            You will receive a simulated collect request notification on your UPI app to authorize this transaction.
          </p>
        </div>
      )}

      {/* Security Assurance */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>RBI-Compliant 256-bit SSL encrypted & Level 1 PCI-DSS tokenized</span>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Delivery
        </Button>
        <Button
          type="submit"
          size="lg"
          isLoading={isProcessing}
          className="px-8"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Review Order • ₹{grandTotal.toLocaleString('en-IN')}
        </Button>
      </div>
    </form>
  );
};
