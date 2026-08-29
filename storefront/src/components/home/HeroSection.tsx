'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
      {/* Cinematic Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90"
          alt="ELEMENTAL Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 animate-subtleZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-[0.2em] uppercase text-stone-200 mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>New Season Editions • Pan-India Free Delivery</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white leading-[1.08] mb-6">
          Form, Texture & <br className="hidden sm:inline" />
          <span className="italic font-normal">Pure Materiality</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          An architectural study in everyday garments and living artifacts. Handcrafted from botanical bamboo silk, organic Coimbatore cotton, and Moradabad brass.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 font-semibold tracking-wider uppercase text-xs shadow-xl hover:scale-105"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Collection
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 text-white border-white/40 hover:bg-white/10 hover:border-white tracking-wider uppercase text-xs"
            >
              Our Philosophy
            </Button>
          </Link>
        </div>

        {/* Editorial Highlights Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-8 border-t border-white/10 text-left">
          <div>
            <span className="block text-2xl font-serif font-medium text-white">100%</span>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider">Natural Fibers</span>
          </div>
          <div>
            <span className="block text-2xl font-serif font-medium text-white">₹1,999+</span>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider">Free Express Delivery</span>
          </div>
          <div>
            <span className="block text-2xl font-serif font-medium text-white">Artisanal</span>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider">Indian Master Guilds</span>
          </div>
          <div>
            <span className="block text-2xl font-serif font-medium text-white">Carbon Neutral</span>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider">Tracked Dispatch</span>
          </div>
        </div>

      </div>
    </section>
  );
};
