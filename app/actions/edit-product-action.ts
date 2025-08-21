'use server'

import { CreateProductSchema } from "../src/schemas"

type ActionStateType = {
    errors: string[],
    successMessage: string
}

export async function editProduct(id:string,prevState:ActionStateType,formData:FormData) {
    
    const rawData = {
        name: formData.get('name'),
        categoryId: formData.get('categoryId'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
    }

    const result = CreateProductSchema.safeParse(rawData);
    if(!result.success){
        return{
            errors: result.error.issues.map(issue => issue.message),
            successMessage: ''
        }
    }

    const request = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
    });

    const response = await request.json();

    if(!request.ok){
        return{
            errors: [response.message],
            successMessage: ''
        }
    }

    return{
        errors: [],
        successMessage: 'Editado correctamente',
    }
}