// CategoryButtons.tsx
import React from 'react';
import Image from 'next/image';
import formatCategoryName from '@/helpers/formateName';

interface CategoryButtonsProps {
  availableCategories: string[];
  activeCategory: string | null;
  toggleCategory: (category: string) => void;
  categoryIcons: Record<string, string>;
  dishes: Record<string, { title: string; imageUrl: string }[]>;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  availableCategories,
  activeCategory,
  toggleCategory,
  categoryIcons,
  dishes
}) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {availableCategories.map((category) => {
          const dishesCount = dishes?.[category]?.length || 0;
          return (
            <div
            key={category}
            className='shrink-0'
            >
              <button
              
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeCategory === category
                  ? 'border-red-300 border-2'
                  : 'bg-gray-100'
              }`}
              onClick={() => toggleCategory(category)}
            >
              <div className="w-16 h-16 mx-2 flex items-center justify-center">
                <Image
                  width={100}
                  height={64}
                  src={categoryIcons[category]}
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold mt-1 capitalize">
                {formatCategoryName(category)}
              </span>
              <span className="text-xs text-gray-800">
                {dishesCount} item{dishesCount !== 1 ? 's' : ''}
              </span>
            </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryButtons;
