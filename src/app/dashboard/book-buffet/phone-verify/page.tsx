"use client";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import OtpVerify from "@/components/ui/OtpVerify";
import Button from "@/components/reuseable/Button";
import { useState } from "react";



const PhoneVerify: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  console.log(isVerified);
  
  const route = useRouter();
  return (
    <>
    <div className="w-full p-8">
       
 
       <ProgressSteps currentStep={2} />
 
     <div className="py-12"> 
     <OtpVerify setIsVerified={setIsVerified}/>
     </div>
     <div className="flex justify-between pt-8">
       <Button
         label="Back"
         onClick={() => route.back()}
         className="catr-btn"
       />
       {isVerified && (
         <Button label="Next" href="/dashboard/book-buffet/booking-form" />
        )}
     </div>
   </div></>);
};

export default PhoneVerify;
