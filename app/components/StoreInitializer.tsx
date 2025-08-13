//this component is invisible and has been created in order to set products in store (inventory), and receives data from store page
'use client'

import { useEffect } from 'react'
import { useCartStore } from '../src/store'
import { Product } from '../src/schemas'

export default function StoreInitializer({ products }: { products: Product[] }) {
  const setInventory = useCartStore(state => state.setInventory)

  useEffect(() => {
    setInventory(products)
  }, [products, setInventory])

  return null
}
