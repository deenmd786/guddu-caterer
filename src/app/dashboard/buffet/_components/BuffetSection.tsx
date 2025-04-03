import React, { useState } from "react";
import SubCategory from "../../_components/SubCategory";
import Image from "next/image";
import { IBuffetData } from "@/types/buffetTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UpdatePrices from "../../_components/UpdatePrices";

interface BuffetSectionProps {
  selectedPeople: number;
  initialData: IBuffetData; // Add initialData prop for the update form
}

const categoryIcons: Record<string, string> = {
  starters: "https://cdn-icons-png.flaticon.com/512/1706/1706607.png",
  salads: "https://cdn-icons-png.flaticon.com/512/2515/2515263.png",
  "main course": "https://cdn-icons-png.flaticon.com/512/1041/1041910.png",
  "live food stations": "https://cdn-icons-png.flaticon.com/512/2921/2921220.png",
  desserts: "https://cdn-icons-png.flaticon.com/512/1041/1041911.png",
  beverages: "https://cdn-icons-png.flaticon.com/512/1041/1041912.png",
};

const BuffetSection: React.FC<BuffetSectionProps> = ({
  selectedPeople,
  initialData,
}) => {
  const [buffetData, setBuffetData] = useState<IBuffetData>(initialData); // State to manage buffet data
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to manage the visibility of the update form
  console.log("initialData", initialData);
  
  // Calculate price and discount
  const priceForSelectedPeople = buffetData.prices[selectedPeople] || 0;
  const originalPrice = priceForSelectedPeople * 1.3; // Assuming original price is 30% more

  // Apply discount if available
  const discount = buffetData.offers && buffetData.offers[0]?.discount ? buffetData.offers[0].discount : 0; // Check if offers exist
  const discountedPrice = priceForSelectedPeople * (1 - discount / 100);

  // Filter available categories with dishes
  const availableCategories = Object.keys(categoryIcons).filter(
    (category) => buffetData.dishes[category]?.length > 0
  );

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleUpdate = async (data: IBuffetData) => {
    // Handle the update logic here
    console.log("Updated data:", data);
    setBuffetData(data);
    setShowUpdateForm(false); // Close the form after updating
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg border mb-2 relative">
      {/* Section Title and Discount Percentage */}
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-900">{buffetData.title}</h3>
        {buffetData.offers && buffetData.offers[0] && (
          <span className="text-lg text-red-500 font-semibold ml-4">
            {buffetData.offers[0].name} - {buffetData.offers[0].discount}% Off
          </span>
        )}
      </div>

      {/* Toggle Button for Update Form */}
      {user?.role === "ADMIN" && (
        <button
          onClick={() => setShowUpdateForm((prev) => !prev)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition mt-4"
        >
          {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
        </button>
      )}

      {/* Conditional Rendering of Update Form as Full-Screen Popup */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
            <UpdatePrices onUpdate={handleUpdate} initialData={buffetData} />
            <button
              onClick={() => setShowUpdateForm(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Category Selection */}
      <div className="mt-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {availableCategories.map((category) => (
            <button
              key={category}
              className={`flex flex-col items-center p-2 transition rounded-lg ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleCategory(category)}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  width={64}
                  height={64}
                  src={categoryIcons[category]}
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold mt-1 capitalize">
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Display Dishes */}
        {activeCategory && initialData.dishes[activeCategory] && (
          <div className="pb-4 flex gap-3 overflow-x-auto transition-all duration-300">
            {initialData.dishes[activeCategory].map((dish, index) => (
              <SubCategory key={index} dishes={[dish]} />
            ))}
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <p className="text-lg font-medium text-gray-800">Catering Price:</p>

        <div className="flex flex-col items-end">
          {priceForSelectedPeople !== undefined ? (
            <>
              {/* Original Price with 30% increase (Strikethrough) */}
              <span className="text-lg text-red-500 line-through">
                ₹{originalPrice.toFixed(0)}
              </span>

              {/* Final Price after discount (Highlighted) */}
              <span className="text-xl font-bold text-green-600">
                ₹{discountedPrice.toFixed(0)}
              </span>
            </>
          ) : (
            <span className="text-lg text-gray-500">Price not available</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuffetSection;