'use client'

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImageAction } from "../actions/upload-product-image-action";
import { getImageUrl } from "../src/utils";

export default function ImageDropZone({currentImage} : {currentImage? : string}) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const onDrop = useCallback(async (files:File[]) => {
        const file = files[0];
        if (!file) return;

        //create a formData in order to send it to api
        const formData = new FormData();
        formData.append("file", file);

        const image = await uploadImageAction(formData);
        setImageUrl(image);
    }, [])

    const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg'],
        },
        maxFiles:1,
        onDrop
    })

  return (
    <>
        <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
            ${isDragAccept ? "border-green-500 bg-green-50" : ""}
            ${isDragReject ? "border-red-500 bg-red-50" : ""}
            ${isDragActive && !isDragReject ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
        >
        <input {...getInputProps()} />

        {!isDragActive && (
            <p className="text-gray-600">Arrastra una imagen aquí o haz click para seleccionar.</p>
        )}

        {isDragActive && !isDragReject && (
            <p className="text-blue-600 font-semibold">¡Suelta el archivo aquí!</p>
        )}

        {isDragAccept && (
            <p className="text-green-600 font-semibold">Archivo válido, listo para subir ✅</p>
        )}

        {isDragReject && (
            <p className="text-red-600 font-semibold">Archivo no válido ❌</p>
        )}

        {imageUrl && (
            <div className="space-y-2">
            <p className="text-green-600">✅ Imagen subida con éxito</p>
            <img src={imageUrl} alt="Preview" className="rounded-xl shadow-md max-h-60 mx-auto" />
            </div>
        )}

        {currentImage && !imageUrl && (
            <div>
                <img src={getImageUrl(currentImage)} alt="Preview" className="rounded-xl shadow-md max-h-60 mx-auto" />
            </div>
        )}
        </div>

        <input type="hidden" name="image" id="image" value={imageUrl ?? currentImage} />
    </>
  );
}