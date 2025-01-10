"use client";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import OtpVerify from "@/components/ui/OtpVerify";
import Button from "@/components/reuseable/Button";



const PhoneVerify: React.FC = () => {
  const route = useRouter();
  return (
    <>
    {/* Structured Data for SEO */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{
         __html: JSON.stringify({
           "@context": "https://schema.org",
           "@type": "WebPage",
           name: "Phone Verification",
           description: "Complete your phone number verification to confirm your catering booking with Guddu Catering Service.",
           author: {
             "@type": "Organization",
             name: "Guddu Catering",
             url: "https://www.gudducaterer.in",
           },
           mainEntity: {
             "@type": "HowTo",
             name: "Phone Number Verification",
             description: "A step-by-step guide to verify your phone number for catering bookings.",
             step: [
               {
                 "@type": "HowToStep",
                 name: "Enter your phone number",
                 text: "Input your phone number to receive a verification code.",
               },
               {
                 "@type": "HowToStep",
                 name: "Receive verification code",
                 text: "Check your SMS for the verification code sent to your phone.",
               },
               {
                 "@type": "HowToStep",
                 name: "Enter the verification code",
                 text: "Input the received code to verify your phone number.",
               },
             ],
           },
         }),
       }} />
    <div className="w-full p-8">
       
 
       <ProgressSteps currentStep={2} />
 
     <div className="py-12"> 
     <OtpVerify />
     </div>
     <div className="flex justify-between pt-8">
       <Button
         label="Back"
         onClick={() => route.back()}
         className="catr-btn"
       />
       <Button label="Next" href="/dashboard/book-buffet/booking-form" />
     </div>
   </div></>);
};

export default PhoneVerify;
