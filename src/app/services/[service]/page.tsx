// app/services/[service]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { ServiceKey, servicesData } from "../../../data/servicesData";
import Hero from "../../../components/admin-com/Hero";

const ServicePage: React.FC = () => {
  const params = useParams();
  const service = Array.isArray(params.service) ? params.service[0] : params.service;

  const serviceKey = service as ServiceKey | undefined;
  const serviceData = serviceKey ? servicesData[serviceKey] : undefined;

  useEffect(() => {
    if (serviceData) {
      document.title = `${serviceData.title}`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `Discover our ${serviceData.title} service. We offer top-notch solutions tailored for your needs.`);
      }
    } else {
      document.title = "Service Not Found - Guddu Catering";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", "The service you are looking for is not available. Explore our other services.");
      }
    }
  }, [serviceData]);

  return (
    <div lang="en">
      {serviceData ? (
        <Hero serviceKey={serviceKey} />
      ) : (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <p>The service you are looking for does not exist.</p>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
