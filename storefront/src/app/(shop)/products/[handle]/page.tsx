import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { ProductDetailClient } from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
        />
      </div>
    </div>
  );
}
