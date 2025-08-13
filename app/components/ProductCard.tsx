'use client'

import { useCartStore } from "@/app/src/store";
import { Product } from "../src/schemas";

export default function ProductCard({product}:{product:Product}) {
    const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
        key={product.id}
        className="rounded-xl p-4 shadow hover:shadow-md transition bg-white"
    >
        {product.image && (
        <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/${product.image}`}
            alt={product.name}
            width={200}
            height={400}
            className="object-cover rounded mb-3 mx-auto"
        />
        )}
        <h2 className="text-base text-gray-700 leading-snug mb-1 truncate">{product.name}</h2>
        <p className="text-base font-bold text-green-600 mb-1">${product.price}</p>
        <p className="text-xs text-gray-600">6 x ${(+product.price/6).toFixed(2)} sin interés</p>
        <p
            className={`text-sm ${
                product.quantity > 0 ? 'text-amber-600' : 'text-red-500'
            }`}
            >
            {product.quantity == 0 ? 'Sin stock' : product.quantity == 1 ? 'Último disponible' : `${product.quantity} en stock`}
        </p>
        <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer text-base"
        >
        Agregar al carrito
        </button>
    </div>
  );
}