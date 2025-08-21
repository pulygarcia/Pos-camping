'use client'

import { useActionState, useEffect } from "react";
import { editProduct } from "../actions/edit-product-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditProductForm({children, id} : {children: React.ReactNode, id:string}) {
    const router = useRouter();

    const initialState = {
      errors: [],
      successMessage: ''
    }

    const editProductWithId = editProduct.bind(null, id);
    const [state, formAction] = useActionState(editProductWithId, initialState);

    useEffect(() => {
      if(state.errors.length > 0){
        state.errors.map(e => toast.error(e))
      }
      if(state.successMessage){
        toast.success(state.successMessage);
        router.push('/admin');
      }
    },[state])

  return (
    <form action={formAction} className="flex flex-col gap-4">
        {children}

        <input
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 cursor-pointer"
          value="Guardar cambios"
        />
      </form>
  );
}