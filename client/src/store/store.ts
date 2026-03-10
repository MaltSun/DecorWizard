import { create } from "zustand";
import { persist } from "zustand/middleware"; 

export interface CartItem {
  id: string;
  quantity: number;
}

export interface IStore {
  cart: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  getItemQuantity: (id: string) => number;
  getTotalItems: () => number;
}

export const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      cart: [],

      add: (id: string) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ cart: [...cart, { id, quantity: 1 }] });
        }
      },

      remove: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      update: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().remove(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clear: () => set({ cart: [] }),

      getItemQuantity: (id: string) => {
        return get().cart.find((item) => item.id === id)?.quantity || 0;
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    { name: "cart-storage" } 
  )
);