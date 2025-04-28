import React, { useMemo, useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BuffetHeader from './BuffetHeader';
import AdminUpdateButton from './AdminUpdateButton';
import CategoryButtons from './CategoryButtons';
import PriceSection from './PriceSection';
import UpdatePrices from "@/app/dashboard/_components/UpdatePrices";
import SubCategory from "../../_components/SubCategory";
import BuffetActions from "./BuffetActions";

interface BuffetSectionProps {
  selectedPeople: number;
  initialData: IBuffetData;
  selectedQualityPercent: number;
}

const categoryIcons: Record<string, string> = {
  "starters": "/assets/images/categoryIcons/starter.png",
  "salads": "/assets/images/categoryIcons/salads.png",
  "main-course": "/assets/images/categoryIcons/main-course.png",
  "live-stall": "/assets/images/categoryIcons/live-station.png",
  "desserts": "/assets/images/categoryIcons/desserts.png",
  "beverages": "/assets/images/categoryIcons/beverages.png",
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

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const handleUpdate = async (data: IBuffetData) => {
    setBuffetData(data);
    setShowUpdateForm(false);
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <section className="p-3 sm:p-4 bg-white shadow-lg rounded-lg border relative">
      <BuffetHeader title={buffetData.title} discount={discount} />
      {/* Admin functionality for updating buffet data */}
      {user?.role === "ADMIN" && (
        <AdminUpdateButton
          showUpdateForm={showUpdateForm}
          onToggleUpdateForm={() => setShowUpdateForm((prev) => !prev)}
        />
      )}
      {/* Modal for showing update form */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
          <button
              onClick={() => setShowUpdateForm(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
            <UpdatePrices onUpdate={handleUpdate} initialData={buffetData} />
            
          </div>
        </div>
      )}
      {/* Category navigation buttons */}
      <CategoryButtons
        availableCategories={availableCategories}
        activeCategory={activeCategory}
        toggleCategory={toggleCategory}
        categoryIcons={categoryIcons}
        dishes={buffetData.dishes}
      />
      
      {/* Display dishes of the active category with smooth transition */}
      <div
        className={`${
          activeCategory ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in-out transform ${
          activeCategory ? "scale-100" : "scale-95"
        }`}
      >
        {activeCategory && buffetData.dishes[activeCategory] && (
          <div className="pb-2 flex gap-2 overflow-x-auto transition-all duration-300">
            {buffetData.dishes[activeCategory].map((dish, index) => (
              <SubCategory key={index} dishes={[dish]} />
            ))}
          </div>
        )}
      </div>

      {/* Price section with original and discounted prices */}
      <PriceSection
        priceForSelectedPeople={priceForSelectedPeople}
        discountedPrice={discountedPrice}
        perPlate={Number(buffetData.perPlate)}
      />

<BuffetActions
  onGetBestPrice={() => {
    window.location.href = "tel:+918851253661"; // replace with your number
  }}
/>

    </section>
  );
};

export default BuffetSection;
