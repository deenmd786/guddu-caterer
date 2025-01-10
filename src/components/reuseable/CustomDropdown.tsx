import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import the dropdown icon

// Define the props interface
interface CustomDropdownProps {
  categories: string[]; // Array of category strings
  selectedCategory: string; // Currently selected category
  setSelectedCategory: (category: string) => void; // Function to set the selected category
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full md:w-1/2 z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        className="border border-black rounded p-1 md:p-2 text-sm md:text-base w-full text-left flex items-center justify-between"
      >
        <span className="capitalize">{selectedCategory}</span>
        <FaChevronDown className="ml-2" /> {/* Dropdown icon */}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[var(--background)] border border-black rounded-md shadow-lg max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleSelect(category)}
              className="p-2 cursor-pointer hover:bg-[var(--button)] hover:text-white capitalize"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default CustomDropdown;