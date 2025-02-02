
import OurServices from "@/components/layout/OurServices";
import { Metadata } from "next";

export const metadata: Metadata= {
  title: "Our Services",
  description: "Explore Guddu Catering's premium catering services for weddings, corporate events, and private parties in Delhi. Customizable buffets, live cooking stations, and exceptional service for every occasion.",
  };

  const servicePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Our Services - Guddu Catering",
    "description": "Explore the exceptional catering services offered by Guddu Catering in Delhi. We specialize in weddings, corporate events, and private parties.",
    "url": "https://www.gudducaterer.in/services",
    "publisher": {
        "@type": "Organization",
        "name": "Guddu Catering",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.gudducaterer.in/logo.png"
        }
    }
};

export default function Services() {
  return (
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }} />
        <OurServices/>
    </>
  );
}