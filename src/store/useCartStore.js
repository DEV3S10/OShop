/**
 * useCartStore — shopping cart state
 *
 * Persists cart items to localStorage.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.id === product.id)
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          }))
        } else {
          set((state) => ({ items: [...state.items, { ...product, qty: 1 }] }))
        }
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      updateQty: (id, qty) => {
        if (qty < 1) return
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce((acc, i) => acc + i.price * i.qty, 0)
      },

      count: () => {
        return get().items.reduce((acc, i) => acc + i.qty, 0)
      },
    }),
    {
      name: 'shopwave-cart',
    }
  )
)

export default useCartStore
