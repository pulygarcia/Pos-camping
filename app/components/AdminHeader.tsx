import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="shadow-lg px-4 py-6">
      <div className="container mx-auto w-full flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-600">Admin Panel</h2>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-gray-600 hover:text-amber-600 transition"
            >
              Productos
            </Link>
            <Link
              href="/admin/purchases"
              className="text-gray-600 hover:text-amber-600 transition"
            >
              Ventas
            </Link>
            <Link
              href="/1"
              className="text-gray-600 hover:text-amber-600 transition"
            >
              Inicio
            </Link>
          </nav>
      </div>
    </header>
  );
}
