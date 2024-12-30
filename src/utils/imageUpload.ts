import imageCompression from "browser-image-compression";

const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

interface UploadImageResponse {
  url: string;
  publicId: string;
}

const compressImage = async (image: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1080, // Resize if the dimensions are larger
    useWebWorker: true, // Better performance
  };
  return await imageCompression(image, options);
};

const imageUpload = async (image: File): Promise<UploadImageResponse> => {

  const compressedImage = await compressImage(image);

  const formData = new FormData();
  formData.append("file", compressedImage);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PRESET}`
  );

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!dataResponse.ok) {
    throw new Error("Image upload failed.");
  }

  const data = await dataResponse.json();

  return { url: data.secure_url, publicId: data.public_id };
};

export default imageUpload;
