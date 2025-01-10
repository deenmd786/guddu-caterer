import { Category } from "../../types/types";
import React from "react";

// Define the props interface
interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null; 
  onCategoryClick: (category: Category | null) => void;
}

const MenuCategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <fieldset className="flex flex-wrap justify-center" aria-labelledby="category-selector-label">
      <legend id="category-selector-label" className="sr-only">
        Select a category
      </legend>
      <select
        id="category-selector"
        value={selectedCategory?.id || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedCat = categories.find(
            (category) => category.id.toString() === selectedId
          );
          onCategoryClick(selectedCat || null); // Handle case where no category is found
        }}
        className="border border-[var(--border)] py-1 px-2 rounded-md w-full"
        aria-label="Select a category"
      >
        <option value="" disabled>
          Select a Category
        </option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className={
                selectedCategory?.id === category.id
                  ? "bg-[var(--red)] text-[var(--text-white)]"
                  : "text-[var(--text-red)]"
              }
            >
              {category.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No categories available
          </option>
        )}
      </select>
    </fieldset>
  );
};

export default MenuCategorySelector;