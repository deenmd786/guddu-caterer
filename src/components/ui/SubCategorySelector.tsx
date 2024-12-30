import { SubCategory } from "../../types/types";
import React from "react";

interface SubCategorySelectorProps {
  subcategories: SubCategory[];
  selectedSubcategory: SubCategory | null; 
  onSubCategoryClick: (subCategory: SubCategory | null) => Promise<void>; // Change to Promise<void>
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  subcategories,
  selectedSubcategory,
  onSubCategoryClick,
}) => {
  return (
    <div className="flex  flex-wrap justify-center">
      <select
        id="subcategory-selector"
        value={selectedSubcategory?.id || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedSub = subcategories.find(
            (subCategory) => subCategory.id.toString() === selectedId
          );
          onSubCategoryClick(selectedSub || null);
        }}
        className="border border-[var(--border)] py-1 px-2 rounded-md w-full"
      >
        <option value="" disabled>
          Select a Subcategory
        </option>
        {subcategories.map((subCategory) => (
          <option
            key={subCategory.id}
            value={subCategory.id}
            className={
              selectedSubcategory?.id === subCategory.id
                ? "bg-[var(--red)] text-[var(--text-white)]"
                : "text-[var(--text-primary)]"
            }
          >
            {subCategory.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubCategorySelector;