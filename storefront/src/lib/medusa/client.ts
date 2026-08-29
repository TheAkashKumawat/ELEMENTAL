import { PRODUCTS, SHIPPING_OPTIONS } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/data/categories';
import { Product, ProductCategory, CategoryHandle } from '@/types';

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export interface ProductFilterParams {
  category?: CategoryHandle;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  inStockOnly?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  searchQuery?: string;
}

/**
 * Medusa Client Data Layer
 * Seamlessly interfaces with Medusa Headless Commerce backend REST API
 * with automatic fallback to high-fidelity seed catalog for zero-config client previews.
 */
export const medusaClient = {
  getProducts: async (params?: ProductFilterParams): Promise<Product[]> => {
    try {
      // If live Medusa instance is reachable, we attempt to fetch
      if (process.env.NEXT_PUBLIC_USE_LIVE_MEDUSA === 'true') {
        const res = await fetch(`${MEDUSA_BACKEND_URL}/store/products`, { next: { revalidate: 60 } });
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            return data.products;
          }
        }
      }
    } catch {
      // Fallback to local catalog
    }

    // High performance local filtering
    let list = [...PRODUCTS];

    if (params?.category) {
      list = list.filter((p) => p.category === params.category);
    }

    if (params?.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (params?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (params.minPrice || 0));
    }

    if (params?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= (params.maxPrice || 1000));
    }

    if (params?.colors && params.colors.length > 0) {
      list = list.filter((p) =>
        p.availableColors?.some((c) => params.colors?.includes(c.name))
      );
    }

    if (params?.sizes && params.sizes.length > 0) {
      list = list.filter((p) =>
        p.availableSizes?.some((s) => params.sizes?.includes(s))
      );
    }

    if (params?.inStockOnly) {
      list = list.filter((p) =>
        p.variants.some((v) => v.inventoryQuantity > 0)
      );
    }

    // Sorting
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
        default:
          list.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
          break;
      }
    }

    return list;
  },

  getProductByHandle: async (handle: string): Promise<Product | null> => {
    try {
      if (process.env.NEXT_PUBLIC_USE_LIVE_MEDUSA === 'true') {
        const res = await fetch(`${MEDUSA_BACKEND_URL}/store/products?handle=${handle}`, { next: { revalidate: 60 } });
        if (res.ok) {
          const data = await res.json();
          if (data.products?.[0]) return data.products[0];
        }
      }
    } catch {
      // Fallback
    }

    const product = PRODUCTS.find((p) => p.handle === handle);
    return product || null;
  },

  getCategories: async (): Promise<ProductCategory[]> => {
    return CATEGORIES;
  },

  getCategoryByHandle: async (handle: string): Promise<ProductCategory | null> => {
    return CATEGORIES.find((c) => c.handle === handle) || null;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    return PRODUCTS.filter((p) => p.isFeatured);
  },

  getRelatedProducts: async (category: CategoryHandle, currentId: string): Promise<Product[]> => {
    return PRODUCTS.filter((p) => p.category === category && p.id !== currentId).slice(0, 4);
  },

  getShippingOptions: async () => {
    return SHIPPING_OPTIONS;
  },
};
