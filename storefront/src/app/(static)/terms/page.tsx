import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-stone-600 leading-relaxed">
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest font-mono">
          Legal & Compliance
        </span>
        <h1 className="text-3xl font-serif font-light text-stone-950 mt-1">
          Terms & Conditions of Sale
        </h1>
        <p className="text-stone-400 mt-1 font-mono">Last updated: February 2026</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          1. Storefront Demonstration Protocol
        </h2>
        <p>
          This website serves as a high-fidelity e-commerce showcase project for ELEMENTAL India, illustrating modern direct-to-consumer software architecture powered by Next.js 14+ (App Router), TypeScript, Tailwind CSS, Medusa.js, and Stripe/UPI test simulation.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          2. Orders & Stock Allocations
        </h2>
        <p>
          Product availability and stock numbers reflect real-time allocations. In test mode, transactions simulate realistic authorizations without debiting genuine currency.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          3. Compliance with Indian E-Commerce Rules
        </h2>
        <p>
          Designed in compliance with the Consumer Protection (E-Commerce) Rules, 2020 of the Government of India, ensuring transparent country of origin disclosures, clear return protocols, and GST invoicing.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
          4. Intellectual Property
        </h2>
        <p>
          All typography, layout architectures, custom design systems, and code structures are proprietary to ELEMENTAL India Private Limited.
        </p>
      </div>
    </div>
  );
}
