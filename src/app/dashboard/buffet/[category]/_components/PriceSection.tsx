// PriceSection.tsx
import React from 'react';

interface PriceSectionProps {
  priceForSelectedPeople: number;
  discountedPrice: number;
  perPlate: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  priceForSelectedPeople,
  discountedPrice,
  perPlate,
}) => {
  return (
    <div className="p-2 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-lg flex justify-between items-center">
      <div className="flex flex-col text-right w-full">
        {priceForSelectedPeople !== undefined ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">
                Original (₹{perPlate}/plate):
              </span>
              <span className="text-lg text-red-500 line-through font-bold">
                ₹{priceForSelectedPeople.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-600 font-medium">
                Discounted Price:
              </span>
              <span className="text-xl text-green-600 font-semibold">
                ₹{discountedPrice.toFixed(0)}
              </span>
            </div>
          </>
        ) : (
          <span className="text-base text-gray-500 italic">
            Price not available
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
