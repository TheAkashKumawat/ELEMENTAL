'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block text-[11px] uppercase tracking-widest text-stone-400 font-medium">
          ELEMENTAL • Pan-India Express Delivery
        </div>
        <div className="flex-1 text-center font-normal tracking-wide text-stone-200">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Complimentary Express Shipping on orders above ₹1,999</span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-400">
              Use code <strong className="text-white font-semibold">WELCOME10</strong> for 10% off
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <Link href="/faq" className="hidden lg:inline hover:text-white transition-colors">
            Help
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-500 hover:text-stone-300 p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
