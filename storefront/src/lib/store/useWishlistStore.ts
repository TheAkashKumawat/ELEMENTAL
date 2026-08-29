import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: ['prod_cashmere_crewneck', 'prod_ceramic_sculptural_vase'], // Default pre-saved for instant demo

      toggleWishlist: (productId) => {
        const ids = get().wishlistIds;
        const exists = ids.includes(productId);
        if (exists) {
          set({ wishlistIds: ids.filter((id) => id !== productId) });
          return false;
        } else {
          set({ wishlistIds: [...ids, productId] });
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().wishlistIds.includes(productId);
      },

      removeFromWishlist: (productId) => {
        set({ wishlistIds: get().wishlistIds.filter((id) => id !== productId) });
      },

      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'elemental-wishlist-storage',
    }
  )
);
