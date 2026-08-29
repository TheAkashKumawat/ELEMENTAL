import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  if (!publishableKey) {
    return null;
  }
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const STRIPE_TEST_CARDS = [
  {
    type: 'Standard Visa (Success)',
    number: '4242 •••• •••• 4242',
    rawNumber: '4242424242424242',
    exp: '12/28',
    cvc: '321',
    zip: '90210',
    description: 'Always succeeds in Stripe test mode',
  },
  {
    type: 'Mastercard Test (Success)',
    number: '5555 •••• •••• 4444',
    rawNumber: '5555555555554444',
    exp: '08/29',
    cvc: '888',
    zip: '10001',
    description: 'Simulates Mastercard settlement',
  },
  {
    type: '3D Secure Required',
    number: '4000 •••• •••• 3063',
    rawNumber: '4000000000003063',
    exp: '10/27',
    cvc: '123',
    zip: '94103',
    description: 'Triggers simulated 3DS authentication challenge',
  },
];
