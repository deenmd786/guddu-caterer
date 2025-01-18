import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

interface ItemCardProps {
  altText: string;
  imgUrl: string;
  title: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ altText, imgUrl, title }) => {
  return (
    <div className="text-center">
      <Image
        alt={altText}
        className="w-full h-48 object-cover mb-4"
        src={imgUrl}
        width={500}
        height={300} // Next.js requires width & height for layout optimization
      />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex justify-center mt-2">
        <FaHeart className="text-red-500 text-xl" />
      </div>
    </div>
  );
};

export default ItemCard;
