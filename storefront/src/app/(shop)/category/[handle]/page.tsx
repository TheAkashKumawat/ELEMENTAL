import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/data/categories';
import { PRODUCTS } from '@/lib/data/products';
import { CategoryListingClient } from './CategoryListingClient';
import { CategoryHandle } from '@/types';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    handle: cat.handle,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const category = CATEGORIES.find((c) => c.handle === handle);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.handle);

  return (
    <div>
      {/* Category Hero Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-stone-950 flex items-center justify-center overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-stone-950/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <span className="text-xs font-semibold text-amber-300 tracking-[0.25em] uppercase font-mono">
            Collection • {categoryProducts.length} Creations
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white mt-2 mb-3">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Category Content with Interactive Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryListingClient
          category={category.handle as CategoryHandle}
          categoryName={category.name}
          initialProducts={categoryProducts}
        />
      </div>
    </div>
  );
}
