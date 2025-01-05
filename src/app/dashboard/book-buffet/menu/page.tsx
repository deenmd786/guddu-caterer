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
     {/* Structured Data for SEO */}
     <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Catering Service",
        name: "Buffet Catering Customization",
        description: "Explore and customize a buffet menu tailored for your event. Book your catering experience with seamless navigation and premium service.",
        provider: {
          "@type": "Organization",
          name: "Guddu Catering Service",
          url: "https://www.gudducaterer.in",
          logo: "https://www.gudducaterer.in/logo.png",
        },
        offers: {
          "@type": "Offer",
          url: "https://www.gudducaterer.in/dashboard/book-buffet",
          priceCurrency: "INR",
          price: "Affordable pricing based on menu selection",
          itemOffered: {
            "@type": "MenuItem",
            name: "Custom Buffet Menu",
            description: "A customizable buffet menu for events, including various cuisines and dishes.",
          },
        },
      }),
    }} />
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
     </>
  );
};

export default BookBuffet;