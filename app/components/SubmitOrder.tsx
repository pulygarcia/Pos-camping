'use client'

import { useActionState, useEffect } from "react";
import { submitOrder } from "../actions/submit-order-action";
import { useCartStore } from "../src/store";
import { toast } from "react-toastify";

export default function SubmitOrder() {
  const totalToPay = useCartStore(state => state.totalToPay());
  const contents = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const orderData = { //this put the correct names that backend expect ej: backend expect total, not totalToPay, and product id instead Id
    total: totalToPay,
    contents: contents.map(item => ({
    price: item.price,
    quantity: item.cartQuantity,
    productId: item.id
  }))
  }

   const initialState = {
      errors: [],
      successMessage: ''
    }

    const submitOrderWithData = submitOrder.bind(null, orderData)
    const [state, formAction] = useActionState(submitOrderWithData, initialState)

    useEffect(() => {
      if (state.successMessage) {
        toast.success('Compra finalizada con éxito');
        clearCart();
      }
      if (state.errors) {
        state.errors.forEach(e => toast.error(e))
      }
    }, [state.successMessage]);

  return (
    <form action={formAction}>
        <input 
            type="submit" 
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            value="Finalizar compra"
        />
    </form>
  );
}