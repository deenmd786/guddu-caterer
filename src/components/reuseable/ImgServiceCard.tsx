import Image from "next/image";
import React from "react";

type ImageCardProps = {
  imageUrl: string;
  altText: string;
  description: string; // Corrected from discription to description
};

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, altText, description }) => {
  return (
    <div className="relative w-full h-72 md:h-56 overflow-hidden rounded-lg shadow-lg group">
      {/* Use w-full for full width */}
      <Image
        src={imageUrl}
        alt={altText}
        fill
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 ease-in-out"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex gap-10 px-4 flex-col md:hidden items-center justify-center">
        <span className="text-white text-base font-semibold text-center">
          {description}
        </span>
        <span className="text-white text-base font-semibold text-center">
          {`"${altText}"`}
        </span>
      </div>
      {/* Hover effect for larger screens */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#333] to-transparent transform translate-y-full  md:group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center p-4">
        <span className="text-white capitalize text-base font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-center">
          {description}
        </span>
      </div>
    </div>
  );
};

export default ImageCard;