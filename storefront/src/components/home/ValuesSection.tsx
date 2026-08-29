import React from 'react';
import { Feather, ShieldCheck, Globe, RefreshCw } from 'lucide-react';

export const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: Feather,
      title: '100% Cruelty-Free Fibers',
      description: 'Botanical bamboo silk, organic Belgian linen flax, Coimbatore combed cotton, and Italian plant bio-leather.',
    },
    {
      icon: ShieldCheck,
      title: 'Generational Craft',
      description: 'Handcrafted by heritage master artisan clusters in Jaipur, Moradabad, Coimbatore, and Civitanova.',
    },
    {
      icon: Globe,
      title: 'Pan-India Carbon Neutral',
      description: '100% of emissions from ground and air shipping across India are offset through Western Ghats reforestation.',
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Care Advisory',
      description: 'Complimentary hardware servicing, spare corozo buttons, and maintenance guides for every heirloom piece.',
    },
  ];

  return (
    <section className="py-20 bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="space-y-3 p-6 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-medium font-serif text-white tracking-wide">
                  {v.title}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
