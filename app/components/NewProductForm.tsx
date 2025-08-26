'use client'

import { useActionState, useEffect } from "react";
import { addProduct } from "../actions/add-product-action";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function NewProductForm({children} : {children: React.ReactNode}) {
    const initialState = {
      errors: [],
      successMessage: ''
    }

    const [state, formAction] = useActionState(addProduct, initialState);

    useEffect(() => {
      if(state.errors.length > 0){
        state.errors.map(e => toast.error(e))
      }
      if(state.successMessage){
        toast.success(state.successMessage)
        redirect('/admin')
      }
    },[state])

  return (
    <form action={formAction} className="flex flex-col gap-4">
        {children}

        <input
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 cursor-pointer"
          value="Agregar producto"
        />
      </form>
  );
}