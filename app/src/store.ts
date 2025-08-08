import { create } from 'zustand'
import { Product, CartProduct } from './schemas'


interface CartStore {
  cart: CartProduct[]
  inventory: Product[] // api products
  setInventory: (products:Product[]) => void
  addToCart: (product: Omit<Product, 'quantity'>) => void
  updateQuantity: (id:Product['id'], quantity:number) => void
  removeItemFromCart: (id:Product['id']) => void
  totalToPay: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  inventory: [],

  setInventory: (products:Product[]) => set({ inventory: products }),

  totalToPay: () => 
    get().cart.reduce((acc, item) => acc + +item.price * item.cartQuantity, 0),

  addToCart: (product) => {
    const { cart, inventory } = get()
    const existing = cart.find((item) => item.id === product.id)
    const productInInventory = inventory.find((item) => item.id === product.id)

    if (!productInInventory) {
      console.warn('Producto no encontrado en el inventario')
      return
    }

    const availableStock = productInInventory.quantity;

    if (existing) {
      if (existing.cartQuantity < availableStock) {
        set({
          cart: cart.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        })
      } else {
        console.warn('No hay más stock disponible de este producto.')
      }
    } else {
      if (availableStock > 0) {
        set({
          cart: [...cart, { ...product, cartQuantity: 1 }],
        })
      } else {
        console.warn('Producto sin stock.')
      }
    }
  },

  updateQuantity : (id, quantity) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: quantity }
          : item
      ),
    })
  },

  removeItemFromCart : (id) => {
    set({
      cart: get().cart.filter(item => item.id !== id)
    })
  }
}))
