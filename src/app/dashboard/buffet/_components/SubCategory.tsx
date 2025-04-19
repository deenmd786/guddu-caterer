import React from "react";
import ItemCard from "./ItemCard";

// Define the props interface for the SubCategory component
interface SubCategoryProps {
  dishes: { title: string; imageUrl: string }[];
}

const SubCategory: React.FC<SubCategoryProps> = ({ dishes }) => {
  return (
    <div>
      {/* Items Section - Grid Layout */}
      <div className="">
        {dishes.map((dish, index) => (
          <ItemCard 
            key={index} 
            imgUrl={dish.imageUrl} 
            title={dish.title} 
          />
        ))}
      </div>
    </div>
  );
};

export default SubCategory;