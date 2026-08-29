import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      publication: 'MONOCLE',
      headline: 'The new benchmark for quiet luxury',
      quote: 'ELEMENTAL proves that minimalism is not the absence of design, but the mastery of raw materiality and proportional harmony.',
      location: 'London / Zurich',
    },
    {
      publication: 'ARCHITECTURAL DIGEST',
      headline: 'Objects that anchor contemporary interiors',
      quote: 'The coarse stoneware vases and solid brass desk lamps exude a monastic elegance rarely encountered in modern consumer commerce.',
      location: 'New York',
    },
    {
      publication: 'GQ STYLE',
      headline: 'Unmatched footwear construction',
      quote: 'From the plant bio-leather court sneaker to the waxed canvas Chelsea boot, the attention to welt stitching and sustainable materiality is sublime.',
      location: 'Milan',
    },
  ];

  return (
    <section className="py-24 bg-stone-50/60 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold text-stone-400 tracking-[0.2em] uppercase">
            Critical Acclaim
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-950 mt-1">
            Praised by Design Critics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-stone-200 absolute top-6 right-6 stroke-[1.5]" />
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h4 className="text-base font-serif font-semibold text-stone-900 mb-2">
                  &ldquo;{t.headline}&rdquo;
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-stone-950 uppercase">
                  {t.publication}
                </span>
                <span className="text-[11px] text-stone-400">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
