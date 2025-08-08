import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  quantity: z.number(),
  image: z.string(),
  category: CategorySchema.optional()
});

export const CartProductSchema = ProductSchema.omit({ quantity: true }).extend({
  cartQuantity: z.number(), 
});

export type Product = z.infer<typeof ProductSchema>;
export type CartProduct = z.infer<typeof CartProductSchema>;

