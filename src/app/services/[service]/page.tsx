"use client";

import React from "react";
import { ServiceKey, servicesData } from "../../../data/servicesData";
import { useParams } from "next/navigation";
import Hero from "../../../components/admin-com/Hero";

const ServicePage: React.FC = () => {
  const params = useParams();
  const service = Array.isArray(params.service) ? params.service[0] : params.service;

  // Ensure service is a string and matches ServiceKey
  const serviceKey = Array.isArray(service) ? service[0] : service;
  const validServiceKey = serviceKey as ServiceKey | undefined;

  // Check if the service key is valid and exists in servicesData
  const serviceData = validServiceKey ? servicesData[validServiceKey] : undefined;

  const metaData = {
    title: serviceData ? `Service - ${serviceData.title}` : "Service Not Found - Guddu Catering",
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
    <html lang="en">
      <head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:url" content={metaData.url} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.image} />
      </head>
      <body>
        {serviceData ? (
          <Hero serviceKey={validServiceKey} />
        ) : (
          <div className="text-center p-4">
            <h1 className="text-2xl font-bold">Service Not Found</h1>
            <p>The service you are looking for does not exist.</p>
          </div>
        )}
      </body>
    </html>
  );
};

export default ServicePage;
