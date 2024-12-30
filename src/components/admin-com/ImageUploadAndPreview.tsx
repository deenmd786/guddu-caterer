import React, { useEffect, useState } from "react";
import Image from "next/image";
import imageUpload from "../../utils/imageUpload";
import { FaUpload, FaTrash } from "react-icons/fa"; // Import FaTrash for delete icon

interface ImageUploadAndPreviewProps {
  onImageUpload: (urls: string[]) => void;
  onImageDelete?: (url: string) => void; // Add this prop
  loading: boolean;
  initialImages?: string[];
  shouldReset?: boolean; // New prop to trigger reset
}

const SingleImageShimmer = () => (
  <div className="w-20 h-20 bg-gray-200 animate-pulse rounded"></div>
);

const ImageUploadAndPreview: React.FC<ImageUploadAndPreviewProps> = ({
  onImageUpload,
  onImageDelete,
  loading,
  initialImages = [],
  shouldReset = false,
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isImageLoading, setIsImageLoading] = useState<boolean[]>(
    Array(initialImages.length).fill(false)
  );

  useEffect(() => {
    if (initialImages.length > 0) {
      setUploadedImages(initialImages);
      setIsImageLoading(Array(initialImages.length).fill(false));
    }
  }, [initialImages]);

  useEffect(() => {
    if (shouldReset) {
      setUploadedImages([]);
      setIsImageLoading([]);
    }
  }, [shouldReset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUploadedImages: string[] = [];
      const loadingStates: boolean[] = [];

      for (const file of Array.from(files)) {
        loadingStates.push(true);
        try {
          const { url } = await imageUpload(file);
          newUploadedImages.push(url);
        } catch (error) {
          alert("Image upload failed. Please try again.");
          console.error("Error uploading image:", error);
          loadingStates.push(false);
        }
      }

      setUploadedImages((prev) => [...prev, ...newUploadedImages]);
      setIsImageLoading((prev) => [...prev, ...loadingStates]);
      onImageUpload(newUploadedImages);
    }
  };

  const handleImageLoad = (index: number) => {
    setIsImageLoading((prev) => {
      const newLoadingStates = [...prev];
      newLoadingStates[index] = false;
      return newLoadingStates;
    });
  };

  const handleImageDelete = (index: number) => {
    const deletedImageUrl = uploadedImages[index];
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    onImageDelete!(deletedImageUrl);
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="w-full border-2 border-[var(--border)] text-[--text-primary]  p-3 mt-3 rounded-lg flex justify-center items-center cursor-pointer hover:bg-[] hover:text-[var(--text-secondary)] transition-colors"
      >
        <FaUpload className="mr-2 text-xl" />
        <span className="text-lg font-bold">Upload Image</span>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          disabled={loading}
        />
      </label>
      <div className="flex gap-2 mt-4 overflow-x-auto text-[--text-primary] hide-scrollbar">
        {uploadedImages.length === 0 ? (
          <p>No image selected</p>
        ) : (
          uploadedImages.map((src, index) => (
            <div key={src} className="relative w-20 h-20 mb-2 shrink-0 group">
              {" "}
              {/* Added group class here */}
              {isImageLoading[index] && <SingleImageShimmer />}
              <Image
                src={src}
                width={200}
                height={200}
                alt={`Uploaded Preview ${index + 1}`}
                className={`w-20 h-20 object-cover rounded transition-opacity duration-300 ${
                  isImageLoading[index] ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
              />
              <button
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 bg-[var(--button)] text-[--text-primary] rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                title="Delete Image"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageUploadAndPreview;
