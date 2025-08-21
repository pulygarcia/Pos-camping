import EditDataForm from "@/app/components/EditDataForm";
import EditProductForm from "@/app/components/EditProductForm";


export default async function EditProductPage({params} : {params: Promise<{ id: string }>}) {
  const {id} = await params;

  return (
    <>
      <div className="max-w-xl mx-auto p-6 mt-6">
        <h1 className="text-2xl font-bold mb-6">Editar producto</h1>
        <EditProductForm id={id}>
          <EditDataForm id={id}/>
        </EditProductForm>
      </div>
    </>
  );
}