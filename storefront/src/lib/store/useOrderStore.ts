import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, ShippingAddress, ShippingOption, CartItem } from '@/types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Order) => void;
  createOrderFromCart: (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    shippingOption: ShippingOption,
    subtotal: number,
    shippingTotal: number,
    taxTotal: number,
    discountTotal: number,
    total: number
  ) => Order;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_elm_9841',
    orderNumber: 'ELM-9841',
    createdAt: '2026-02-20T14:32:00Z',
    status: 'shipped',
    paymentStatus: 'paid',
    items: [
      {
        id: 'oi_1',
        productId: 'prod_cashmere_crewneck',
        title: 'Pure Bamboo Silk Relaxed Crewneck',
        variantTitle: 'Natural Oatmeal Heather / M',
        thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
        price: 18499,
        quantity: 1,
      },
      {
        id: 'oi_2',
        productId: 'prod_hand_poured_soy_candle',
        title: 'Botanical Resin & Sandalwood Candle (400g)',
        variantTitle: 'No. 04 Mysore Sandalwood & Amber / 400g',
        thumbnail: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
        price: 2899,
        quantity: 2,
      },
    ],
    subtotal: 24297,
    shippingTotal: 0,
    taxTotal: 2916,
    discountTotal: 2430,
    total: 24783,
    shippingAddress: {
      firstName: 'Rohan',
      lastName: 'Sharma',
      email: 'rohan.sharma@elemental.in',
      phone: '+91 98201 45678',
      address1: 'Flat 402, Sea Green Heights, Worli Sea Face',
      address2: 'Near Century Bazaar',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400018',
      country: 'India',
      province: 'Maharashtra',
      postalCode: '400018',
    },
    shippingOption: {
      id: 'ship_standard',
      name: 'BlueDart / Delhivery Surface Express',
      description: 'Tracked ground transit across all Indian states.',
      price: 0,
      estimatedDays: '3–5 Business Days',
    },
    trackingNumber: 'ELM-IND-9928172034',
    estimatedDelivery: 'Feb 26, 2026',
  },
];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,
      currentOrder: null,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }));
      },

      createOrderFromCart: (
        items,
        shippingAddress,
        shippingOption,
        subtotal,
        shippingTotal,
        taxTotal,
        discountTotal,
        total
      ) => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `ELM-${randomDigits}`;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 4);

        const newOrder: Order = {
          id: `ord_${Date.now()}`,
          orderNumber,
          createdAt: new Date().toISOString(),
          status: 'processing',
          paymentStatus: 'paid',
          items: items.map((i) => ({
            id: `item_${Date.now()}_${i.variantId}`,
            productId: i.productId,
            title: i.title,
            variantTitle: i.variantTitle,
            thumbnail: i.thumbnail,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal,
          shippingTotal,
          taxTotal,
          discountTotal,
          total,
          shippingAddress,
          shippingOption,
          trackingNumber: `ELM-IND-${Math.floor(100000000 + Math.random() * 900000000)}`,
          estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        };

        get().addOrder(newOrder);
        return newOrder;
      },

      getOrderById: (id) => get().orders.find((o) => o.id === id),
      getOrderByNumber: (orderNumber) =>
        get().orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()),
    }),
    {
      name: 'elemental-orders-storage',
    }
  )
);
