import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});
export const CategoryResponseSchema = z.array(CategorySchema);

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  quantity: z.number(),
  image: z.string(),
  category: CategorySchema.optional()
});

export const productsResponseSchema = z.object({
  data: z.array(ProductSchema),
  total: z.number()
})

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre no puede superar los 100 caracteres" }),
    
  price: z
    .coerce
    .number()
    .min(1, { message: "El precio debe ser mayor o igual a 1" })
    .max(1000000, { message: "El precio no puede superar 1,000,000" }),

  quantity: z
    .coerce
    .number()
    .min(1, { message: "Se debe agregar al menos una unidad al stock" })
    .max(10000, { message: "La cantidad no puede superar 10,000" }),

  categoryId: z
    .string()
    .min(1, { message: "Debes seleccionar una categoría" }),
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

