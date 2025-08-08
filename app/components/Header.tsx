'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "../src/store";

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCartStore();

  return (
    <header className="container mx-auto px-4 w-full py-6 flex items-center justify-between">
      <Link href={'/1'} className="text-xl font-bold text-amber-600">Camping Center</Link>
      <nav className="flex gap-6 text-gray-600 text-base font-medium">
        
        {/* cart */}
        <Link
          href="/cart"
          className="flex items-center gap-1 cursor-pointer relative transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={pathname === '/cart' ? "#d97706" : "currentColor"}
            width="20"
            height="20"
          >
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 13.5h10.5l1.125-4.5H6.056m-.95-3.728L4.5 6.75m0 0h15.75m-13.5 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm11.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <span className={pathname === '/cart' ? "text-amber-600 hover:text-black" : "hover:text-amber-600"}>
            Carrito
          </span>

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {/* purchases */}
        <Link
          href="/purchases"
          className="flex items-center gap-1 cursor-pointer hover:text-amber-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={pathname === '/purchases' ? "#d97706" : "currentColor"}
            strokeWidth="2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 10l-2 -6" />
            <path d="M7 10l2 -6" />
            <path d="M13 20h-5.756a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304" />
            <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
            <path d="M19 21v1m0 -8v1" />
          </svg>
          <span className={pathname === '/purchases' ? "text-amber-600 hover:text-black" : "hover:text-amber-600"}>
            Compras
          </span>
        </Link>
      </nav>
    </header>
  );
}
