'use client';

import { useCartStore } from "../src/store";
import Link from "next/link";
import SubmitOrder from "./SubmitOrder";

export default function Cart() {
    const { cart, inventory, updateQuantity, removeItemFromCart } = useCartStore();
    const totalToPay = useCartStore((state) => state.totalToPay());

    const totalItems = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

    const isCartEmpty = cart.length === 0;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-[auto_392px] gap-8 max-w-6xl">         
                {/* list column */}
                <div>
                    {isCartEmpty ? (
                        <div className="text-center p-6 bg-white rounded-md">
                            <p className="text-lg font-semibold mb-2">Tu carrito está vacío</p>
                            <p className="text-gray-600 mb-4">Comienza a agregar productos</p>
                            <Link 
                                href="/1" 
                                className="text-blue-500 text-sm hover:underline"
                            >
                                Descubrí productos
                            </Link>
                        </div>
                    ) : (
                        cart.map((item) => {
                            const productInventoryQuantity = inventory.find(p => p.id === item.id)?.quantity!;

                            return (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-4 gap-2 items-center border-b rounded-md border-gray-200 bg-white p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/${item.image}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-base font-semibold">{item.name}</h3>
                                        <button 
                                            onClick={() => removeItemFromCart(item.id)} 
                                            className="mt-2 text-blue-500 text-sm cursor-pointer hover:text-blue-600 hover:underline"
                                        >
                                            Eliminar
                                        </button>
                                    </div>

                                    <div>
                                        <select
                                            id={`quantity-${item.id}`}
                                            value={item.cartQuantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-full text-center border border-blue-500 rounded px-2 py-1 text-sm"
                                        >
                                            {Array.from({ length: productInventoryQuantity }, (_, i) => i + 1).map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 text-center mt-2">
                                            {productInventoryQuantity == 1 ? 'Último disponible' : `${productInventoryQuantity} disponibles`}
                                        </p>
                                    </div>

                                    <p className="text-lg text-right font-medium text-gray-700">$ {item.price}</p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Summerizing */}
                <div 
                    className={`rounded-md p-6 h-fit bg-white ${isCartEmpty ? "opacity-50" : ""}`}
                >
                    <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">Resumen de compra</h2>

                    {isCartEmpty && (
                        <p className="text-sm text-gray-500 mb-4">
                            Aquí podrás ver el resumen de tu compra y el total a pagar para continuar.
                        </p>
                    )}

                    {!isCartEmpty && (
                        <>
                            <ul className="space-y-2 mb-6">
                                <li className="flex justify-between text-sm">
                                    <span>{totalItems > 1 ? `Productos (${totalItems})` : 'Producto'}</span>
                                    <span className="text-gray-700 font-medium">${totalToPay}</span>
                                </li>
                            </ul>

                            <div className="flex justify-between text-sm">
                                <span>Envío</span>
                                <span className="text-green-600 font-medium">Gratis</span>
                            </div>

                            <div className="pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-gray-700 mb-4">Total</p>
                                    <span className="font-semibold">${totalToPay}</span>
                                </div>

                                <SubmitOrder />
                                
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
