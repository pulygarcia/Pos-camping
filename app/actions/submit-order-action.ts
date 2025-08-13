'use server'

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "../src/schemas"

export async function submitOrder(orderData: unknown) {
    const order = OrderSchema.parse(orderData);
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(order)
    })

    const response = await req.json();
    if(!req.ok){
        const errors = ErrorResponseSchema.parse(response)
        return{
            errors: errors.message.map(issue => issue),
            successMessage: ''
        }
    }

    const success = SuccessResponseSchema.parse(response);

    return{
        errors: [],
        successMessage: success.msg
    }
}