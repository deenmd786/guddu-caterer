// BuffetHeader.tsx
import React from 'react';

interface BuffetHeaderProps {
  title: string;
  discount: number;
}

const BuffetHeader: React.FC<BuffetHeaderProps> = ({ title, discount }) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-base font-bold text-gray-900 capitalize">{title}</h3>
      {discount && (
        <span className="inline-flex items-center text-sm font-semibold text-red-600 bg-red-100 pl-4 p-2 sm:p-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          {discount}% Off
        </span>
      )}
    </div>
  );
};

export default BuffetHeader;
