'use client';

import React, { useState } from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { Search } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const allFaqs = [
    {
      category: 'Shipping & Pan-India Logistics',
      items: [
        {
          id: 'faq_1',
          title: 'Where do you deliver, and what are the delivery times?',
          content: 'We provide complimentary carbon-neutral express delivery across all 28 Indian States and 8 Union Territories on orders above ₹1,999. Standard BlueDart/Delhivery surface takes 3–5 business days, Air Priority takes 1–2 business days, and Same-Day Metro Dispatch arrives by 8 PM in Mumbai, Delhi NCR, and Bengaluru.',
        },
        {
          id: 'faq_2',
          title: 'Are GST taxes and delivery charges included?',
          content: 'Yes. All displayed prices are 100% GST inclusive (12% or 18% depending on the craft category). A formal GST tax invoice with input tax credit (ITC) eligibility will be sent upon dispatch.',
        },
      ],
    },
    {
      category: 'Orders & Indian Payment Options',
      items: [
        {
          id: 'faq_3',
          title: 'What payment methods are supported?',
          content: 'We accept instant UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay cards, Visa, Mastercard, American Express, and NetBanking across all major Indian banks (HDFC, ICICI, SBI, Axis, Kotak).',
        },
        {
          id: 'faq_4',
          title: 'How can I modify or cancel my order?',
          content: 'Orders can be adjusted or cancelled within 60 minutes of placement directly from your Client Portal or by messaging concierge@elemental.in.',
        },
      ],
    },
    {
      category: 'Returns & Lifetime Care',
      items: [
        {
          id: 'faq_5',
          title: 'What is your returns policy?',
          content: 'We offer hassle-free returns across India within 30 days of confirmed delivery. Items must remain unworn, unwashed, with original tags and presentation packaging intact. Return courier pickups are fully complimentary.',
        },
        {
          id: 'faq_6',
          title: 'Are all ELEMENTAL creations 100% cruelty-free and vegan?',
          content: 'Yes. We strictly use 100% plant-based fibers, botanical bamboo silk, organic linen, combed long-staple cotton, and certified plant bio-leather (cactus / apple skin). Zero animal-derived materials are ever used.',
        },
      ],
    },
    {
      category: 'Sizing & Materials',
      items: [
        {
          id: 'faq_7',
          title: 'How do ELEMENTAL garments and footwear fit?',
          content: 'Our apparel is designed in a modern tailored silhouette with intentional drape suited for Indian climates. Footwear conforms to standard European sizing. If between sizes, we recommend sizing down for sneakers and true-to-size for boots.',
        },
        {
          id: 'faq_8',
          title: 'Where are your raw materials sourced?',
          content: 'Our botanical bamboo silk and organic cotton are sourced from Coimbatore. Our flax linen is organically grown, and our solid brass is hand-turned in Moradabad.',
        },
      ],
    },
  ];

  const filteredCategories = allFaqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof i.content === 'string' && i.content.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold text-stone-400 tracking-[0.25em] uppercase font-mono">
          Concierge Support
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-950">
          Frequently Answered Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          Detailed guidance regarding our craftsmanship, Pan-India logistics, sizing standards, and lifetime servicing.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries (e.g. delivery, UPI, GST, sizing)..."
            className="w-full h-11 pl-11 pr-4 bg-stone-50 border border-stone-300 rounded-full text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-xs">
            No inquiries match your query. Contact our concierge directly at concierge@elemental.in.
          </div>
        ) : (
          filteredCategories.map((category, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2">
                {category.category}
              </h2>
              <Accordion items={category.items} defaultOpenId={category.items[0]?.id} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}
