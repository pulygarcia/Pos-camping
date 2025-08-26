import { CategoryResponseSchema } from "../src/schemas";
import ImageDropZone from "./UploadProductImage";

async function getCategories(){
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;
    const req = await fetch(url);
    const res = await req.json();
    const categories = CategoryResponseSchema.parse(res);

    return categories
}

export default async function ProductDataForm() {
    const categories = await getCategories();

  return (
    <>
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
            <label className="block mb-1 font-medium">Categoría</label>
            <select
                id="categoryId"
                name="categoryId"
                className="w-full border border-gray-300 rounded px-3 py-2"
                defaultValue={''}
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
          />
        </div>

        <ImageDropZone />
    </>
  );
}