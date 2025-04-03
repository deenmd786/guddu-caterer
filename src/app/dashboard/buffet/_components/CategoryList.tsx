"use client";

import Image from "next/image";
import { categories } from "@/data/categories";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/dashboard/buffet/${encodeURIComponent(category)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Catering Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="w-20 h-20 mb-3">
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                className="rounded-full border border-gray-200"
              />
            </div>
            <div className="text-lg font-semibold text-gray-700">{category.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
