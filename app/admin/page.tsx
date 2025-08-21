import { Product, productsResponseSchema } from "../src/schemas";
import Link from "next/link";
import { isValidPage } from "../src/utils";
import { redirect } from "next/navigation";
import PaginationNumbers from "../components/Pagination";

type SearchParams = Promise<{page: string}>

export default async function AdminPage({searchParams} : {searchParams: SearchParams}) {

  const {page} = await searchParams;

  if(!isValidPage(+page)){
    redirect('/admin?page=1')
  }

  const getProducts = async (limit:number, skip:number) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
    const req = await fetch(url, { cache: "no-store" }); // avoid cache
    const res = await req.json();

    const json = productsResponseSchema.parse(res)

    return{
      products: json.data,
      total: json.total
    }
  };

  const limit = 10;
  const skip = (+page - 1) * limit;

  
  const {products, total} = await getProducts(limit, skip);
  //page > page products we can show? redirect
  const totalPages = Math.ceil(total / limit);
  if(+page > totalPages) redirect('/admin?page=1');

  return (
    <div className="p-6 container mx-auto">
      <div className="flex items-center gap-10 my-10">
        <h1 className="text-2xl font-bold">Control de productos</h1>
        <Link href={'/admin/products/new'} className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Agregar producto</Link>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Imagen</th>
            <th className="border border-gray-300 px-4 py-2">Categoría</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.category?.name ?? "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="inline-flex gap-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>

                  <button className="text-red-500 hover:text-red-600 hover:underline">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationNumbers currentPage={+page} totalPages={totalPages}/>
    </div>

  );
}
