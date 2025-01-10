"use client";

import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import WhatsAppPage from "../../_components/WhatsAppMessage";
import Button from "@/components/reuseable/Button";
import CateringForm from "@/components/reuseable/CateringForm";

const BookingForm = () => {
    const route = useRouter();

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Catering Booking Service",
        description: "Book your catering service with Guddu Catering Service. Customize your menu and ensure a seamless booking experience.",
        provider: {
            "@type": "Organization",
            name: "Guddu Catering Service",
            url: "https://www.gudducaterer.in",
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: "Affordable pricing based on menu selection",
            itemOffered: {
                "@type": "MenuItem",
                name: "Custom Catering Menu",
                description: "A customizable menu for events, including various cuisines and dishes.",
            },
        },
    };

    return (
           <> {/* Structured Data for SEO */}
           <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
       <div className="p-3 md:p-6">

           <ProgressSteps currentStep={3} />
           <div className="mb-3 flex my-4 justify-center items-center">
               <CateringForm />
           </div>
           <div className="flex justify-between">
               <Button label="Back" onClick={() => route.back()} className="catr-btn" />
               <WhatsAppPage />
           </div>
       </div></>
    );
};

export default BookingForm;