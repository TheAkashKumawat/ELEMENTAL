'use client';

import React from 'react';
import { ShippingOption } from '@/types';
import { Button } from '@/components/ui/Button';
import { Truck, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export interface DeliveryMethodSelectorProps {
  options: ShippingOption[];
  selectedOption: ShippingOption;
  onSelectOption: (option: ShippingOption) => void;
  onBack: () => void;
  onNext: () => void;
  subtotal: number;
}

export const DeliveryMethodSelector: React.FC<DeliveryMethodSelectorProps> = ({
  options,
  selectedOption,
  onSelectOption,
  onBack,
  onNext,
  subtotal,
}) => {
  const isFreeShippingEligible = subtotal >= 1999;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">
          Select Delivery Method
        </h3>
        <p className="text-xs text-stone-500">
          All Indian shipments are carbon-neutral and packaged in 100% recycled archival presentation boxes.
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption.id === option.id;
          const displayPrice =
            option.id === 'ship_standard' && isFreeShippingEligible
              ? 0
              : option.price;

          return (
            <div
              key={option.id}
              onClick={() => onSelectOption(option)}
              className={clsx(
                'p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between',
                isSelected
                  ? 'border-stone-950 bg-stone-50/70 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={clsx(
                    'w-5 h-5 rounded-full border flex items-center justify-center transition-colors',
                    isSelected ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300'
                  )}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                      {option.name}
                    </span>
                    {option.id === 'ship_standard' && isFreeShippingEligible && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold uppercase px-2 py-0.5 rounded">
                        Complimentary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {option.description} • <strong className="text-stone-700 font-medium">{option.estimatedDays}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right font-mono font-semibold text-sm text-stone-900">
                {displayPrice === 0 ? 'FREE' : `₹${displayPrice.toLocaleString('en-IN')}`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
        <Button variant="ghost" size="md" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Shipping
        </Button>
        <Button size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};
