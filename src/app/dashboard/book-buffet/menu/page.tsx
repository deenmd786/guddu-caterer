"use client";

import MenuSection from "../../../../components/layout/MenuSection";
import Button from "../../../../components/reuseable/Button";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import ShowProduct from "../../../../components/layout/ShowProduct";

const BookBuffet = () => {
  const router = useRouter();

  return (
    <div className="w-full p-2 lg:py-4">
      {/* Step Tracker */}
      <ProgressSteps currentStep={1} />

      {/* Content */}
      <div className="lg:hidden ">
      <MenuSection />
      </div>
      <div className="hidden lg:flex">
      <ShowProduct />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button label="Back" onClick={() => router.back()} className="catr-btn" />
        <Button label="Next" href="/dashboard/book-buffet/cart" />
      </div>
    </div>
  );
};

export default BookBuffet;
