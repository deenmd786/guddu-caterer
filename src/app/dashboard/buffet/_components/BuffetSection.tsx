import React, { useMemo, useState } from "react";
import SubCategory from "../../_components/SubCategory";
import Image from "next/image";
import { IBuffetData } from "@/types/buffetTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UpdatePrices from "../../_components/UpdatePrices";

interface BuffetSectionProps {
  selectedPeople: number;
  initialData: IBuffetData;
  selectedQualityPercent: number;
}

const categoryIcons: Record<string, string> = {
  starters: "/assets/images/categoryIcons/starter.png", // Replace with valid URLs
  salads: "/assets/images/categoryIcons/salads.png",
  "main course": "/assets/images/categoryIcons/main-course.png",
  "live food stations": "/assets/images/categoryIcons/live-station.png",
  desserts: "/assets/images/categoryIcons/desserts.png",
  beverages: "/assets/images/categoryIcons/beverages.png",
};

const BuffetSection: React.FC<BuffetSectionProps> = ({
  selectedPeople,
  initialData,
  selectedQualityPercent,
}) => {
  const [buffetData, setBuffetData] = useState<IBuffetData>(initialData);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const priceForSelectedPeople = useMemo(() => {
    return buffetData.perPlate
      ? selectedPeople * Number(buffetData.perPlate)
      : 0;
  }, [buffetData.perPlate, selectedPeople]);

  const discount = useMemo(() => {
    const peopleDiscount =
      parseFloat(buffetData.discounts[selectedPeople]) || 0;
    return selectedQualityPercent + peopleDiscount;
  }, [selectedPeople, selectedQualityPercent, buffetData.discounts]);

  const discountedPrice = useMemo(() => {
    return priceForSelectedPeople - priceForSelectedPeople * (discount / 100);
  }, [priceForSelectedPeople, discount]);

  // Filter available categories with dishes
  const availableCategories = Object.keys(categoryIcons).filter(
    (category) => buffetData.dishes[category]?.length > 0
  );
  console.log("availableCategories",availableCategories);
  

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleUpdate = async (data: IBuffetData) => {
    console.log("Updated data:", data);
    setBuffetData(data);
    setShowUpdateForm(false);
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <section className="p-4 sm:p-6 bg-white shadow-lg rounded-lg border mb-4 relative">
  <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
  <h3 className="text-2xl font-bold text-gray-900 capitalize">
    {buffetData.title}
  </h3>
  {buffetData.discounts && (
    <span className="inline-flex items-center text-xl font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
    {discount}% Off
  </span>
  
  )}
</div>


  {/* Admin functionality for updating buffet data */}
  {user?.role === "ADMIN" && (
    <button
      onClick={() => setShowUpdateForm((prev) => !prev)}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition mt-4"
    >
      {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
    </button>
  )}

  {/* Modal for showing update form */}
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

  {/* Category navigation buttons */}
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

    {/* Display dishes based on active category */}
    {activeCategory && buffetData.dishes[activeCategory] && (
      <div className="pb-4 flex gap-3 overflow-x-auto transition-all duration-300">
        {buffetData.dishes[activeCategory].map((dish, index) => (
          <SubCategory key={index} dishes={[dish]} />
        ))}
      </div>
    )}
  </div>

  {/* Price section with original and discounted prices */}
<div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-lg flex justify-between items-center">
  <div className="flex flex-col space-y-3 text-right w-full">
    {priceForSelectedPeople !== undefined ? (
      <>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">
            Original (₹{buffetData.perPlate}/plate):
          </span>
          <span className="text-lg text-red-500 line-through font-bold">
            ₹{priceForSelectedPeople.toFixed(0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600 font-medium">
            Discounted Price:
          </span>
          <span className="text-2xl text-green-600 font-semibold">
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

</section>

  );
};

export default BuffetSection;
