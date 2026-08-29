import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomerUser, ShippingAddress } from '@/types';

interface AuthState {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  addAddress: (address: Omit<ShippingAddress, 'isDefault'>, isDefault?: boolean) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const DEMO_USER: CustomerUser = {
  id: 'cust_demo_01',
  email: 'rohan.sharma@elemental.in',
  firstName: 'Rohan',
  lastName: 'Sharma',
  phone: '+91 98201 45678',
  savedAddresses: [
    {
      id: 'addr_1',
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
      isDefault: true,
    },
    {
      id: 'addr_2',
      firstName: 'Rohan',
      lastName: 'Sharma',
      email: 'rohan.sharma@elemental.in',
      phone: '+91 98201 45678',
      address1: '124, 4th Cross, 100 Feet Road',
      address2: 'Indiranagar Stage II',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      country: 'India',
      province: 'Karnataka',
      postalCode: '560038',
      isDefault: false,
    },
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: DEMO_USER, // Pre-populated for instant client demo inspection
      isAuthenticated: true,

      login: async (email, _password) => {
        const user: CustomerUser = {
          id: `cust_${Date.now()}`,
          email,
          firstName: email.split('@')[0].split('.')[0] || 'Client',
          lastName: email.split('@')[0].split('.')[1] || 'Guest',
          savedAddresses: DEMO_USER.savedAddresses,
        };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      register: async (firstName, lastName, email, _password) => {
        const user: CustomerUser = {
          id: `cust_${Date.now()}`,
          email,
          firstName,
          lastName,
          savedAddresses: [],
        };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      addAddress: (address, isDefault = false) => {
        const user = get().user;
        if (!user) return;

        const newId = `addr_${Date.now()}`;
        const newAddr = {
          ...address,
          id: newId,
          isDefault,
          province: address.state,
          postalCode: address.pinCode,
        };

        let addresses = user.savedAddresses;
        if (isDefault) {
          addresses = addresses.map((a) => ({ ...a, isDefault: false }));
        }

        set({
          user: {
            ...user,
            savedAddresses: [...addresses, newAddr],
          },
        });
      },

      deleteAddress: (id) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            savedAddresses: user.savedAddresses.filter((a) => a.id !== id),
          },
        });
      },

      setDefaultAddress: (id) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            savedAddresses: user.savedAddresses.map((a) => ({
              ...a,
              isDefault: a.id === id,
            })),
          },
        });
      },
    }),
    {
      name: 'elemental-auth-storage',
    }
  )
);
