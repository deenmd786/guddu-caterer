"use client";
import React from "react";
import Image from "next/image"; 
import { Product } from "../../types/Products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="relative border rounded-md shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
    >
      {/* Displaying the first image of the product */}
      <div className="w-full h-64 bg-gray-200 relative">
        {product.productImg? (<Image
          src={product.productImg[0]}
          alt={product.productName}
          layout="fill"
          objectFit="cover"
        />): (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <span>No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-700">{product.category}</span>
          <span className="text-sm text-gray-700">{product.region}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
