"use client";
import React from "react";
import { ServiceKey, servicesData } from "../../../data/servicesData";
import { useParams } from "next/navigation";
import Hero from "../../../components/admin-com/Hero";
import Head from "next/head";

const ServicePage: React.FC = () => {
  const params = useParams();
  const service = Array.isArray(params.service) ? params.service[0] : params.service;

  // Ensure service is a string and matches ServiceKey
  const serviceKey = Array.isArray(service) ? service[0] : service;
  const validServiceKey = serviceKey as ServiceKey | undefined;

  // Check if the service key is valid and exists in servicesData
  const serviceData = validServiceKey ? servicesData[validServiceKey] : undefined;

  // Define SEO metadata based on the service
  const seoData = {
    title: serviceData ? `Service - ${serviceData.title}` : "Service Not Found - My Website",
    description: serviceData
      ? `Discover our ${serviceData.title} service. We offer top-notch solutions tailored for your needs.`
      : "The service you are looking for is not available. Explore our other services.",
    keywords: serviceData
      ? `${serviceData.title}, top services, professional solutions`
      : "services, not found, professional solutions",
    url: `https://www.gudducaterer.in/services/${validServiceKey || "not-found"}`,
    image: serviceData?.image || "/default-service-image.jpg", // Placeholder image
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.url} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.image} />
        {/* Add structured data (JSON-LD) for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: serviceData?.title || "Service Not Found",
              description: seoData.description,
              image: seoData.image,
              url: seoData.url,
            }),
          }}
        />
      </Head>
      {serviceData ? (
        <Hero serviceKey={validServiceKey} />
      ) : (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <p>The service you are looking for does not exist.</p>
        </div>
      )}
    </>
  );
};

export default ServicePage;
