"use client";

import OurServices from "@/components/layout/OurServices";
import Head from "next/head";

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services | Guddu Catering Service</title>
        <meta
          name="description"
          content="Explore the exceptional catering services offered by Guddu Catering Service. From weddings to corporate events, we provide delicious food and professional service."
        />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Our Services - Guddu Catering Service",
              description: "Explore the exceptional catering services offered by Guddu Catering. From weddings to corporate events, we provide delicious food and professional service.",
              url: "https://www.gudducaterer.in/services",
            }),
          }}
        />
      </Head>
      
        <OurServices/>
    
    </>
  );
}