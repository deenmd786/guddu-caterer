"use client";

import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import MenuSection from "@/components/layout/MenuSection";
import ShowProduct from "@/components/layout/ShowProduct";
import Button from "@/components/reuseable/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const BookBuffet = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("user: ", user);
  
  const router = useRouter();

  return (
     <>
   <div className="w-full max-h-[91vh] px-3 pt-3 flex flex-col md:max-h-screen">
     

     {/* Step Tracker */}
     <ProgressSteps currentStep={1} />

     {/* Content */}
     <div className="flex-1 lg:hidden">
       <MenuSection />
     </div>
     <div className="hidden lg:flex">
       <ShowProduct />
     </div>

     {/* Navigation Buttons */}
     <div className="flex justify-between ">
       <Button label="Back" onClick={() => router.back()} className="catr-btn" />
        {user?.role === "ADMIN" && (<Button label="Buffet" href="/dashboard/create-buffet" />)}
       <Button label="Next" href="/dashboard/book-buffet/cart" />
     </div>
   </div>
     </>
  );
};

export default BookBuffet;