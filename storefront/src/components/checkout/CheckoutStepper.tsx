import React from 'react';
import { Check, Truck, CreditCard, ShieldCheck, MapPin } from 'lucide-react';
import { clsx } from 'clsx';

export type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review';

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  currentStep,
  onStepClick,
}) => {
  const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
    { id: 'shipping', label: '1. Shipping', icon: MapPin },
    { id: 'delivery', label: '2. Delivery', icon: Truck },
    { id: 'payment', label: '3. Payment', icon: CreditCard },
    { id: 'review', label: '4. Review', icon: ShieldCheck },
  ];

  const stepOrder: CheckoutStep[] = ['shipping', 'delivery', 'payment', 'review'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="w-full py-4 border-b border-stone-200 bg-stone-50/50 mb-8">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                disabled={!isCompleted}
                onClick={() => onStepClick && isCompleted && onStepClick(step.id)}
                className={clsx(
                  'flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors',
                  isCurrent && 'text-stone-950 font-bold',
                  isCompleted && 'text-emerald-700 hover:text-emerald-900 cursor-pointer',
                  !isCurrent && !isCompleted && 'text-stone-400 cursor-not-allowed'
                )}
              >
                <div
                  className={clsx(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all',
                    isCurrent && 'bg-stone-950 text-white shadow-xs',
                    isCompleted && 'bg-emerald-600 text-white',
                    !isCurrent && !isCompleted && 'bg-stone-200 text-stone-500'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="hidden sm:inline">{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-1 h-[2px] mx-3 transition-colors',
                    idx < currentIndex ? 'bg-emerald-600' : 'bg-stone-200'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
