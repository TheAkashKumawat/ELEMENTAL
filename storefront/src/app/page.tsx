import { HeroSection } from '@/components/home/HeroSection';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ValuesSection } from '@/components/home/ValuesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <CategoryTiles />
      <FeaturedProducts />
      <ValuesSection />
      <TestimonialsSection />
    </div>
  );
}
