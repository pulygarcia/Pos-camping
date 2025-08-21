import { CategoryResponseSchema, ProductSchema } from "../src/schemas";

async function getCategories(){
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;
    const req = await fetch(url);
    const res = await req.json();
    const categories = CategoryResponseSchema.parse(res);

    return categories
}

async function getCurrentProduct(id:string){
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`;
  const req = await fetch(url);
  const res = await req.json();
  const product = ProductSchema.parse(res);

  return product
}

export default async function EditDataForm({id} : {id: string }) {
    const categories = await getCategories();
    const currentProduct = await getCurrentProduct(id);

  return (
    <>
        <div>
        <label className="block mb-1 font-medium">Nombre</label>
        <input
            id="name"
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={currentProduct.name}
        />
        </div>
        <div>
            <label className="block mb-1 font-medium">Categoría</label>
            <select
                id="categoryId"
                name="categoryId"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={currentProduct.category?.id}
            >
                <option value="" disabled>
                    Seleccionar categoría
                </option>
                {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                        {categorie.name}
                    </option>
                ))}
            </select>
        </div>
        <div>
        <label className="block mb-1 font-medium">Precio</label>
        <input
            id="price"
            type="number"
            min="1"
            name="price"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={currentProduct.price}
        />
        </div>
        <div>
        <label className="block mb-1 font-medium">Stock</label>
        <input
            id="quantity"
            type="number"
            step="1"
            min="0"
            name="quantity"
            className="w-full border border-gray-300 rounded px-3 py-2"
            defaultValue={currentProduct.quantity}
        />
        </div>
    </>
  );
}