import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
  category: CategorySchema.optional()
});

export const CartProductSchema = ProductSchema.omit({ quantity: true }).extend({
  cartQuantity: z.number(), 
});

const OrderContentSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  productId: z.number()
});

export const OrderSchema = z.object({
  total: z.number(),
  contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacío'})
});

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  msg: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})

export type Product = z.infer<typeof ProductSchema>;
export type CartProduct = z.infer<typeof CartProductSchema>;

