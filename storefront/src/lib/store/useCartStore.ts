import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}

const VALID_PROMOS: Record<string, PromoCode> = {
  'WELCOME10': { code: 'WELCOME10', discountPercent: 10, description: '10% New Client Welcome Discount' },
  'ELEMENTAL15': { code: 'ELEMENTAL15', discountPercent: 15, description: '15% VIP Private Preview Discount' },
  'FREESHIP': { code: 'FREESHIP', discountPercent: 0, description: 'Complimentary Express Shipping' },
};

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedPromo: PromoCode | null;
  promoError: string | null;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => { success: boolean; message: string };
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => { success: boolean; message: string };
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  // Computed helper getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingTotal: (selectedOptionPrice?: number) => number;
  getTaxTotal: () => number;
  getGrandTotal: (selectedOptionPrice?: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedPromo: null,
      promoError: null,

      openCart: () => set({ isDrawerOpen: true }),
      closeCart: () => set({ isDrawerOpen: false }),
      toggleCart: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, variant, quantity = 1) => {
        if (variant.inventoryQuantity <= 0) {
          return { success: false, message: 'This variant is currently out of stock.' };
        }

        const items = get().items;
        const existingIndex = items.findIndex((item) => item.variantId === variant.id);

        if (existingIndex > -1) {
          const currentQty = items[existingIndex].quantity;
          const newQty = currentQty + quantity;

          if (newQty > variant.inventoryQuantity) {
            return {
              success: false,
              message: `Only ${variant.inventoryQuantity} items available in stock.`,
            };
          }

          const updatedItems = [...items];
          updatedItems[existingIndex].quantity = newQty;
          set({ items: updatedItems, isDrawerOpen: true });
          return { success: true, message: `Updated quantity for ${product.title}` };
        } else {
          if (quantity > variant.inventoryQuantity) {
            return {
              success: false,
              message: `Only ${variant.inventoryQuantity} items available in stock.`,
            };
          }

          const newItem: CartItem = {
            id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            productId: product.id,
            variantId: variant.id,
            title: product.title,
            variantTitle: variant.title,
            handle: product.handle,
            thumbnail: product.thumbnail,
            price: variant.price,
            quantity: quantity,
            maxStock: variant.inventoryQuantity,
            color: variant.options.color,
            size: variant.options.size || variant.options.finish || variant.options.fragrance,
          };

          set({ items: [...items, newItem], isDrawerOpen: true });
          return { success: true, message: `Added ${product.title} to your bag.` };
        }
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return { success: true, message: 'Item removed from bag.' };
        }

        const items = get().items;
        const target = items.find((i) => i.variantId === variantId);

        if (!target) {
          return { success: false, message: 'Item not found in bag.' };
        }

        if (quantity > target.maxStock) {
          return {
            success: false,
            message: `Only ${target.maxStock} items available in stock.`,
          };
        }

        set({
          items: items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        });
        return { success: true, message: 'Bag updated.' };
      },

      clearCart: () => set({ items: [], appliedPromo: null, promoError: null }),

      applyPromo: (code) => {
        const clean = code.trim().toUpperCase();
        const promo = VALID_PROMOS[clean];

        if (promo) {
          set({ appliedPromo: promo, promoError: null });
          return true;
        } else {
          set({ promoError: 'Invalid promotional code' });
          return false;
        }
      },

      removePromo: () => set({ appliedPromo: null, promoError: null }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const promo = get().appliedPromo;
        if (!promo || promo.discountPercent === 0) return 0;
        const subtotal = get().getSubtotal();
        return Math.round((subtotal * promo.discountPercent) / 100);
      },

      getShippingTotal: (selectedOptionPrice = 99) => {
        const subtotal = get().getSubtotal();
        const promo = get().appliedPromo;
        if (promo?.code === 'FREESHIP' || subtotal >= 1999) {
          return 0;
        }
        return selectedOptionPrice;
      },

      getTaxTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return Math.round((subtotal - discount) * 0.12); // 12% GST
      },

      getGrandTotal: (selectedOptionPrice = 99) => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingTotal(selectedOptionPrice);
        const tax = get().getTaxTotal();
        return Math.max(0, subtotal - discount + shipping + tax);
      },
    }),
    {
      name: 'elemental-cart-storage',
      partialize: (state) => ({
        items: state.items,
        appliedPromo: state.appliedPromo,
      }),
    }
  )
);
