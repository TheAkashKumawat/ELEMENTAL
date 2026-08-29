import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Feather, ShieldCheck, Globe, RefreshCw, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 space-y-20">
      
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-semibold text-stone-400 tracking-[0.25em] uppercase font-mono">
          ELEMENTAL • Design & Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-stone-950 leading-tight">
          A Study in Architectural Form & Cruelty-Free Materiality
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
          Founded on the conviction that everyday garments and living objects should endure for generations. We strip away decorative excess to honor the unadorned integrity of 100% plant-based fibers, minerals, and honest Indian craftsmanship.
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=85"
            alt="ELEMENTAL Workshop"
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
        </div>
      </section>

      {/* Core Creed Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
              Origin & Heritage
            </span>
            <h2 className="text-3xl font-serif font-light text-stone-950 leading-snug">
              Bridging Contemporary Minimalism & Generational Indian Guilds
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Designed in India, our collections represent an ongoing dialogue between modern architectural proportions and the profound Indian tradition of handspun plant-based textiles and cruelty-free innovation.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              We partner directly with generational master craft clusters in Coimbatore (organic cotton & bamboo silk), Moradabad (brass task lighting), Civitanova (plant bio-leather footwear), and Jaipur (stoneware ceramics & Makrana marble).
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85"
              alt="Craftsmanship in Workshop"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-stone-950 text-white py-20" id="sustainability">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-300 tracking-[0.2em] uppercase font-mono">
              Our 4 Pillars
            </span>
            <h3 className="text-3xl font-serif font-light text-white mt-1">
              Ethical Standards & Environmental Stewardship
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
              <Feather className="w-6 h-6 text-amber-300" />
              <h4 className="text-base font-serif font-semibold text-white">100% Cruelty-Free Fibers</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                From Coimbatore long-staple organic cotton to botanical bamboo silk and apple bio-leather, zero animal materials are ever used.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
              <h4 className="text-base font-serif font-semibold text-white">Zero Overproduction</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                We craft in tight, numbered artisanal batches. Pieces are never incinerated or dumped; they are archived or recycled.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
              <Globe className="w-6 h-6 text-amber-300" />
              <h4 className="text-base font-serif font-semibold text-white">Carbon Neutral Deliveries</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                We offset 100% of transport carbon across all 28 Indian States via verified reforestation projects in the Western Ghats.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
              <RefreshCw className="w-6 h-6 text-amber-300" />
              <h4 className="text-base font-serif font-semibold text-white">Lifetime Care Support</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Complimentary resoling advisory, spare natural Corozo nut buttons, and bio-material care guidance for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h3 className="text-3xl font-serif font-light text-stone-950">
          Experience the Collection
        </h3>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Explore 24 foundational pieces crafted without compromise.
        </p>
        <Link href="/products">
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Catalog
          </Button>
        </Link>
      </section>

    </div>
  );
}
