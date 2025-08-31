"use client";

import Image from "next/image";
import { cateringSizes } from "@/data/cateringSizes"; // Update the import path accordingly
import { useRouter } from "next/navigation";

const CateringSizeList = () => {
  const router = useRouter();

  const handleSizeClick = (size: string) => {
    router.push(`/dashboard/buffet/${encodeURIComponent(size)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Choose Your Catering Size</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cateringSizes.map((size, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => handleSizeClick(size.name)}
          >
            <div className="w-28 h-20 mb-3">
              <Image
                src={size.image} // Use the image from the cateringSizes array
                alt={size.name} // Use the name for the alt text
                width={100}
                height={100}
                className="rounded-full border border-gray-200"
              />
            </div>
            <div className="text-lg font-semibold text-gray-700">{size.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateringSizeList;
