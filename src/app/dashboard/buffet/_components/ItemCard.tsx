import Image from "next/image";
import React, { useState } from "react";

interface ItemCardProps {
  imgUrl: string;
  title: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ imgUrl, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex-shrink-0 w-24 h-32 bg-white shadow-md rounded-lg overflow-hidden">
      <Image width={150} height={150} src={imgUrl} alt={title} className="w-full h-20 object-cover" />
      <div className="p-2">
        <p
          className={`text-xs font-semibold text-gray-900  cursor-pointer ${
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
