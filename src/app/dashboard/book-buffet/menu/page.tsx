"use client";

import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import MenuSection from "@/components/layout/MenuSection";
import ShowProduct from "@/components/layout/ShowProduct";
import Button from "@/components/reuseable/Button";


const BookBuffet = () => {
  const router = useRouter();

  return (
     <>
    <div className="p-8">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p className="text-gray-700">Welcome to the Dashboard panel! Manage your bookings and explore our services.</p>
      <div className="flex justify-between pt-4">
        <Button 
          label="Back to Home" 
          href="/" 
          className="catr-btn" 
        />
        <Button 
          label="Next: Book Buffet Menu" 
          href="/dashboard/book-buffet/menu" 
          className="catr-btn" 
        />
      </div>
    </div>
   <div className="w-full px-3 pt-3  md:max-h-screen">
     

     {/* Step Tracker */}
     <ProgressSteps currentStep={1} />

     {/* Content */}
     <div className="lg:hidden max-h-[84vh]">
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
     </>
  );
};

export default BookBuffet;