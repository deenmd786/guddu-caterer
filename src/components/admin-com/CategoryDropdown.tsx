import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown"; // Adjust the import path as necessary

interface Subcategory {
  id: string | number;
  value: string;
  label: string;
}

interface Category {
  id: string | number;
  label: string;
  value: string;
  subcategories: Subcategory[];
}

interface CategoryDropdownProps {
  categoryOptions: Category[];
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  shouldReset?: boolean;
  initialCategory?: string; // New prop for initial category
  initialSubCategory?: string; // New prop for initial subcategory
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categoryOptions,
  onCategoryChange,
  onSubCategoryChange,
  shouldReset,
  initialCategory = "", // Default to empty string if not provided
  initialSubCategory = "", // Default to empty string if not provided
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategory);
  const [subCategoryOptions, setSubCategoryOptions] = useState<Subcategory[]>([]);

  useEffect(() => {
    // Set initial subcategory options based on the initial category
    const selectedCategoryData = categoryOptions.find(
      (cat) => cat.value === initialCategory
    );
    setSubCategoryOptions(selectedCategoryData ? selectedCategoryData.subcategories : []);
  }, [initialCategory, categoryOptions]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");

    const selectedCategoryData = categoryOptions.find(
      (cat) => cat.value === category
    );
    setSubCategoryOptions(selectedCategoryData ? selectedCategoryData.subcategories : []);
    onCategoryChange(category);
    onSubCategoryChange(""); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    onSubCategoryChange(subCategory);
  };

  useEffect(() => {
    if (shouldReset) {
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSubCategoryOptions([]);
      onCategoryChange(""); // Notify parent of reset
      onSubCategoryChange(""); // Reset subcategory in parent
    }
  }, [shouldReset, onCategoryChange, onSubCategoryChange]); // Include dependencies

  return (
    <div className="flex flex-col space-y-1">
      <Dropdown
        id="category"
        name="category"
        value={selectedCategory}
        options={categoryOptions.map((category) => ({
          id: category.id,
          value: category.value,
          label: category.label,
        }))}
        onChange={(e) => handleCategoryChange(e.target.value)}
      />

      {selectedCategory && subCategoryOptions.length > 0 && (
        <Dropdown
          id="subcategory"
          name="subcategory"
          value={selectedSubCategory}
          options={subCategoryOptions.map((subCategory) => ({
            id: subCategory.id,
            value: subCategory.value,
            label: subCategory.label,
          }))}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default CategoryDropdown;