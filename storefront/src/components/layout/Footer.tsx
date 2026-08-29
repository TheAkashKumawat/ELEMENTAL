'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter & Brand Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-serif font-bold tracking-[0.25em] text-white uppercase block">
              ELEMENTAL
            </span>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              A study in architectural minimalism, pure materiality, and generational Indian artisanal excellence. 
              Designed for contemporary mindful living, crafted sustainably with zero-compromise noble fibers.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pan-India Carbon Neutral Delivery • 100% GST Compliant Invoicing</span>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-2">
              The Elemental Journal & Private Releases
            </h3>
            <p className="text-xs text-stone-400 mb-4 max-w-lg">
              Receive private preview access to limited capsule editions, design monographs, and 10% off your inaugural order.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 bg-stone-900 border border-stone-800 rounded-lg text-emerald-400 text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing. Use code <strong>WELCOME10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="h-11 px-4 bg-stone-900 border border-stone-800 rounded-md text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-500 flex-1"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="h-11 px-5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Join Circle
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          
          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-stone-100 font-semibold tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Pieces</Link></li>
              <li><Link href="/category/apparel" className="hover:text-white transition-colors">Apparel & Botanical Knits</Link></li>
              <li><Link href="/category/footwear" className="hover:text-white transition-colors">Bio-Leather & Canvas Footwear</Link></li>
              <li><Link href="/category/accessories" className="hover:text-white transition-colors">Accessories & Horology</Link></li>
              <li><Link href="/category/home" className="hover:text-white transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="text-stone-100 font-semibold tracking-wider uppercase">About</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Craftsmanship & Heritage</Link></li>
              <li><Link href="/about#sustainability" className="hover:text-white transition-colors">Sustainability Creed</Link></li>
              <li><Link href="/about#materials" className="hover:text-white transition-colors">Ethical Sourcing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Press & Media</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-stone-100 font-semibold tracking-wider uppercase">Concierge</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/faq" className="hover:text-white transition-colors">Client FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Pan-India Express Shipping</Link></li>
              <li><Link href="/shipping#returns" className="hover:text-white transition-colors">Complimentary Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Client Portal */}
          <div className="space-y-3">
            <h4 className="text-stone-100 font-semibold tracking-wider uppercase">Client Portal</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><Link href="/account" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link href="/account/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/account/addresses" className="hover:text-white transition-colors">Address Directory</Link></li>
              <li><Link href="/account/login" className="hover:text-white transition-colors">Client Login</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 ELEMENTAL India Private Limited. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Sale</Link>
          </div>

          {/* Payment Trust Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-400">Secure Payments via UPI & Cards</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-200">UPI</span>
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-200">RUPAY</span>
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-200">VISA</span>
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-200">MASTERCARD</span>
              <span className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-200">NETBANKING</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
