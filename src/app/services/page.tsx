
import OurServices from "@/components/layout/OurServices";
import { Metadata } from "next";

export const metadata: Metadata= {
  title: "Our Services",
  description: "Explore Guddu Catering's premium catering services for weddings, corporate events, and private parties in Delhi. Customizable buffets, live cooking stations, and exceptional service for every occasion.",
  };

export default function Services() {
  return (
    <>
      
        <OurServices/>
    
    </>
  );
}