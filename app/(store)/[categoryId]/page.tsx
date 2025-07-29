import CategoriesListNav from "@/app/components/CategoriesList";

type Params = Promise<{ categoryId: string }>
type Product = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
};

const getCategoryProducts = async (categoryId:string) => {
    const url = `http://localhost:3001/categories/${categoryId}?products=true`;
    const result = await fetch(url);
    const categoryProducts = await result.json();

    return categoryProducts.products || [];
}

const getCategories = async () => {
    const url = `http://localhost:3001/categories`;
    const result = await fetch(url);
    const categories = await result.json();

    return categories || [];
}

export default async function StorePage({params}: {params: Params}) {
    const {categoryId} = await params;

    const products = await getCategoryProducts(categoryId);
    const categories = await getCategories();

    return (
        <div className="mt-6 container mx-auto">
            <h1 className="py-4 text-3xl uppercase">¡Tu próxima salida empieza acá!</h1>

            <div className="my-6">
                <p className="text-sm">Filtrar por</p>
                <CategoriesListNav categories={categories}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product:Product) => (
                <div
                    key={product.id}
                    className="rounded-xl p-4 shadow hover:shadow-md transition bg-white"
                >
                    {product.image && (
                    <img
                        src={`http://localhost:3001/img/${product.image}`}
                        alt={product.name}
                        width={400}
                        height={600}
                        className="object-cover rounded mb-3"
                    />
                    )}
                    <h2 className="text-lg text-gray-700 leading-snug mb-1 truncate">{product.name}</h2>
                    <p className="text-lg font-bold text-green-600 mb-1">${product.price}</p>
                    <p className="text-xs text-gray-600">6 x ${(+product.price/6).toFixed(2)} sin interés</p>
                    <p
                        className={`text-sm ${
                            product.quantity > 0 ? 'text-amber-600' : 'text-red-500'
                        }`}
                        >
                        {product.quantity > 0 ? `${product.quantity} en stock` : 'Sin stock'}
                    </p>
                    <button
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                    Agregar al carrito
                    </button>
                </div>
                ))}
            </div>
        </div>
        
    );
}