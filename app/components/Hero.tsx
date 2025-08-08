'use client'

import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();

  if (pathname === '/cart') return null;
  
  return (
    <section className="w-full h-[38rem]">
        <img
        src="/camping.jpg"
        alt="Camping Hero"
        className="w-full h-full object-cover object-center"
        />
    </section>
  );
}