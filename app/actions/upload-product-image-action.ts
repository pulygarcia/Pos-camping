'use server'

export async function uploadImageAction(formData: FormData) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/upload-image`, {
    method: 'POST',
    body: formData
  });

  const res = await req.json();
  return res.secure_url
}
