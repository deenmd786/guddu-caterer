import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ItemCard from "./ItemCard";

// Define the props interface for the SubCategory component
interface SubCategoryProps {
  title: string;
}

const SubCategory: React.FC<SubCategoryProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      {/* Toggle Button */}
      <button
        className="toggle-section w-full text-left text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </button>

      {/* Items Section */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {/* Three ItemCards */}
        <ItemCard
          altText={`${title} 1`}
          imgUrl={`https://storage.googleapis.com/a1aa/image/oJWYatAGYtMWdIV239xee2PfurxGtPihz_uJ-_ttRUg.jpg`}
          title={`${title} 1`}
        />
        <ItemCard
          altText={`${title} 2`}
          imgUrl={`https://storage.googleapis.com/a1aa/image/mJaiEgq24VHnZVzfsvvA_HBOkxzC3TMcj0wNNyTSby8.jpg`}
          title={`${title} 2`}
        />
        <ItemCard
          altText={`${title} 3`}
          imgUrl={`https://storage.googleapis.com/a1aa/image/aX7WiVIC9iKpC6GBCttJOpahoLWk0Lw_NfJ3sMAn-X4.jpg`}
          title={`${title} 3`}
        />
      </div>
    </div>
  );
};

export default SubCategory;
