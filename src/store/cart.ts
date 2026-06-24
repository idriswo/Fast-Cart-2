import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem extends Product {
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const found = state.items.find((i) => i.id === product.id);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
      total: () =>
        get().items.reduce(
          (s, i) => s + (i.hasDiscount ? i.discountPrice : i.price) * i.qty,
          0
        ),
    }),
    { name: "fastcart-cart" }
  )
);
