'use client'

import { usePathname } from "next/navigation";

export default function Hero() {
  const pathname = usePathname();

  if (pathname === '/cart') return null;
  
  return (
    <section className="w-full h-[38rem] relative">
      <img
        src="/camping.jpg"
        alt="Camping Hero"
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40"></div> {/* dark overlay */}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
          ¡Tu próxima salida empieza acá!
        </h2>
        <p className="mt-3 text-lg md:text-base text-white drop-shadow-md">
          Todo lo que necesitás para tu próxima aventura
        </p>
      </div>
    </section>
  );
}