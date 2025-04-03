import Image from "next/image";
import React, { useState } from "react";

interface ItemCardProps {
  imgUrl: string;
  title: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ imgUrl, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex-shrink-0 w-32 h-40 bg-white shadow-md rounded-lg overflow-hidden">
      <Image width={200} height={200} src={imgUrl} alt={title} className="w-full h-24 object-cover" />
      <div className="p-2">
        <p
          className={`text-base font-semibold text-gray-900 mt-2 cursor-pointer ${
            isExpanded ? "whitespace-normal" : "truncate"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "" : title} // Show full title on hover if truncated
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
