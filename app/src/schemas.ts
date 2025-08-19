import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  quantity: z.number(),
  image: z.string(),
  category: CategorySchema.optional()
});

export const productResponseSchema = z.object({
  data: z.array(ProductSchema),
  total: z.number()
})

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

export const TransactionProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  image: z.string(),
  quantity: z.number(),
});

export const TransactionContentSchema = z.object({
  id: z.number(),
  price: z.preprocess(val => Number(val), z.number()),
  quantity: z.number(),
  product: TransactionProductSchema
});

export const TransactionResponseSchema = z.object({
  id: z.number(),
  total: z.preprocess(val => Number(val), z.number()),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  contents: z.array(TransactionContentSchema),
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema)

export type Product = z.infer<typeof ProductSchema>;
export type CartProduct = z.infer<typeof CartProductSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
export type TransactionContent = z.infer<typeof TransactionResponseSchema>['contents'][number];

