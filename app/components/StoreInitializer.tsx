//this component was created in order to set products in store (inventory), and receives data from store page
'use client'

import { useEffect } from 'react'
import { useCartStore } from '../src/store'

interface Product {
  id: number
  name: string
  price: string
  quantity: number
  image: string
}

export default function StoreInitializer({ products }: { products: Product[] }) {
  const setInventory = useCartStore(state => state.setInventory)

  useEffect(() => {
    setInventory(products)
  }, [products, setInventory])

  return null
}
