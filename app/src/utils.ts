export function isValidPage(value: number) {
    if (value == null) {
      return false;
    }
    
    if (typeof value !== 'number' && isNaN(value)) {
      return false;
    }
    if (value <= 0) {
      return false;
    }
  
    if (!Number.isInteger(value)) {
      return false;
    }

    return true;
}

export function getImageUrl(image: string) {
  if (!image) return "";

  const isCloudinary = image.startsWith("http") && image.includes("cloudinary.com");

  if (isCloudinary) return image;
  //if is not from cloudinary, return locale backend image
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/${image}`;
}