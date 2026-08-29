import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-stone-600 leading-relaxed">
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest font-mono">
          Legal & Privacy
        </span>
        <h1 className="text-3xl font-serif font-light text-stone-950 mt-1">
          Privacy & Data Protection Policy
        </h1>
        <p className="text-stone-400 mt-1 font-mono">Last updated: February 2026</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          1. Data Collection & Use
        </h2>
        <p>
          ELEMENTAL India (&ldquo;we&rdquo;, &ldquo;our&rdquo;) processes minimal customer data strictly required for order fulfillment, courier delivery, GST compliance, and client communications. We never monetize, rent, or sell your personal records to third-party data brokers.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          2. Payment Security & RBI Compliance
        </h2>
        <p>
          All credit card and UPI transactions are transmitted directly to verified payment gateways via end-to-end TLS 1.3 encryption. We do not store raw card numbers, CVV codes, or UPI MPINs on our servers.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          3. Digital Personal Data Protection (DPDP) Act Compliance
        </h2>
        <p>
          We adhere to India&apos;s Digital Personal Data Protection Act (DPDP), granting clients complete visibility, consent management, and rights to request permanent data deletion at any time by emailing privacy@elemental.in.
        </p>
      </div>
    </div>
  );
}
