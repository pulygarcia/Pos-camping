import NewProductForm from "@/app/components/NewProductForm";
import ProductDataForm from "@/app/components/ProductDataForm";

export default function NewProduct() {
  return (
     <div className="max-w-xl mx-auto p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6">Agregar nuevo producto</h1>

      <NewProductForm>
        <ProductDataForm />
      </NewProductForm>
    </div>
  );
}