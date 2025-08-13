import { create } from 'zustand'
import { Product, CartProduct } from './schemas'
import { toast } from 'react-toastify'


interface CartStore {
  cart: CartProduct[]
  inventory: Product[] // api products
  setInventory: (products:Product[]) => void
  addToCart: (product: Omit<Product, 'quantity'>) => void
  updateQuantity: (id:Product['id'], quantity:number) => void
  removeItemFromCart: (id:Product['id']) => void
  totalToPay: () => number
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  inventory: [],

  setInventory: (products:Product[]) => set({ inventory: products }),

  totalToPay: () => 
    get().cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0),

  addToCart: (product) => {
    const { cart, inventory } = get()
    const existing = cart.find((item) => item.id === product.id)
    const productInInventory = inventory.find((item) => item.id === product.id)

    if (!productInInventory) {
      console.warn('Producto no encontrado en el inventario')
      return
    }

    const productWithNumberPrice = { //force price to be a number before save in cart
      ...product,
      price: Number(product.price)
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

        toast.success('Producto agregado al carrito')

      } else {
        toast.error('No hay más stock disponible de este producto.');
      }
    } else {
      if (availableStock > 0) {
        set({
          cart: [...cart, { ...productWithNumberPrice, cartQuantity: 1 }],
        })

        toast.success('Producto agregado al carrito')

      } else {
        toast.error('Producto sin stock')
      }
    }
  },

  //<select> quantity functionality
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
  },

  clearCart: () => {
    set({
      cart: []
    })
  }
}))
