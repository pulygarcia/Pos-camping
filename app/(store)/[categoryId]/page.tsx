import { Product } from "@/app/src/schemas";
import CategoriesListNav from "@/app/components/CategoriesList";
import ProductCard from "@/app/components/ProductCard";
import StoreInitializer from "@/app/components/StoreInitializer";

type Params = Promise<{ categoryId: string }>

const getCategoryProducts = async (categoryId:string) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}?products=true`;
    const result = await fetch(url);
    const categoryProducts = await result.json();

    const products =  categoryProducts.products || [];

    return products.map((product: Product) => ({
        ...product,
        categoryId: product.category?.id,
    }));
}

const getCategories = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`;
    const result = await fetch(url);
    const categories = await result.json();

    return categories || [];
}

export default async function StorePage({params}: {params: Params}) {
    const {categoryId} = await params;

    const products = await getCategoryProducts(categoryId);
    const categories = await getCategories();

    return (
        <section className="bg-gray-50">
            <div className="pt-6 container mx-auto">
                <StoreInitializer products={products}/>
                <div className="my-6">
                    <p className="text-sm">Filtrar por</p>
                    <CategoriesListNav categories={categories}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product:Product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
        
    );
}