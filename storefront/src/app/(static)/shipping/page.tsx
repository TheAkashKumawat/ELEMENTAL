import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold text-stone-400 tracking-[0.25em] uppercase font-mono">
          Pan-India Logistics
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-950">
          Delivery & Return Policies
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          Every piece is packaged in archival presentation boxes and transported via verified carbon-neutral courier services across India.
        </p>
      </div>

      {/* Rates Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
            Delivery Options & Schedules
          </h2>
        </div>
        <div className="divide-y divide-stone-100 text-xs">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-semibold text-stone-900 block">BlueDart / Delhivery Surface Express</strong>
              <p className="text-stone-500 mt-0.5">Tracked transit across all 28 Indian States & UTs. Free on orders over ₹1,999.</p>
              <span className="text-stone-400 font-mono">Transit window: 3–5 Business Days</span>
            </div>
            <span className="text-base font-semibold font-mono text-stone-900 shrink-0">₹99 / FREE</span>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-semibold text-stone-900 block">Air Cargo Priority Express</strong>
              <p className="text-stone-500 mt-0.5">Dedicated air freight with guaranteed 48-hour delivery across metro airports.</p>
              <span className="text-stone-400 font-mono">Transit window: 1–2 Business Days</span>
            </div>
            <span className="text-base font-semibold font-mono text-stone-900 shrink-0">₹249</span>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="text-sm font-semibold text-stone-900 block">Same-Day Metro White Glove (Mumbai / Delhi NCR / Bengaluru)</strong>
              <p className="text-stone-500 mt-0.5">Hand-delivered priority dispatch with recipient signature confirmation.</p>
              <span className="text-stone-400 font-mono">Transit window: Delivered by 8:00 PM Today</span>
            </div>
            <span className="text-base font-semibold font-mono text-stone-900 shrink-0">₹499</span>
          </div>
        </div>
      </div>

      {/* Taxes & GST */}
      <div className="space-y-6 text-xs text-stone-600 leading-relaxed pt-6">
        <h3 className="text-lg font-serif font-semibold text-stone-900">
          100% GST Tax Compliant Invoicing
        </h3>
        <p>
          All product prices displayed on ELEMENTAL are all-inclusive of applicable Goods and Services Tax (GST). Official B2C or B2B tax invoices with GSTIN identification and Input Tax Credit (ITC) eligibility are emailed automatically upon dispatch.
        </p>

        <h3 className="text-lg font-serif font-semibold text-stone-900 pt-4" id="returns">
          30-Day Complimentary Doorstep Returns
        </h3>
        <p>
          If a garment or living object does not align with your interior space or sizing expectations, we welcome returns within 30 days of confirmed delivery with zero courier charges.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-stone-500">
          <li>Items must remain unworn, unaltered, and unwashed.</li>
          <li>Original tags, dust bags, and presentation boxes must be intact.</li>
          <li>Footwear soles must show zero outdoor abrasion (try on carpeted surfaces).</li>
        </ul>
      </div>

    </div>
  );
}
