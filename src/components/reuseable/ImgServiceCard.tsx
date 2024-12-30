import Image from "next/image";
import React from "react";

type ImageCardProps = {
  imageUrl: string;
  altText: string;
  description: string; // Corrected from discription to description
};

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, altText, description }) => {
  return (
    <div className="relative w-full h-56 overflow-hidden rounded-lg shadow-lg group">
      {/* Use w-full for full width */}
      <Image
        src={imageUrl}
        alt={altText}
        fill
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 ease-in-out"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFECE7] to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center p-4">
        {/* <span className="text-[var(--text-black)]  capitalize text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-center">
          {altText}
        </span> */}
        <span className="text-[var(--text-primary)] capitalize text-base  font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-center">
          {description}
        </span>
      </div>
    </div>
  );
};

export default ImageCard;