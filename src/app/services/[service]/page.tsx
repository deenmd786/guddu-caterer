// services/[service]/page.tsx

"use client";
import React from "react";
import { ServiceKey } from "../../../data/servicesData"; // Import the services data and ServiceKey type
import { useParams } from "next/navigation";
import Hero from "../../../components/admin-com/Hero";

const ServicePage: React.FC = () => {
  const params = useParams();
  const service = Array.isArray(params.service) ? params.service[0] : params.service;

  // Ensure service is a string and matches ServiceKey
  const serviceKey = Array.isArray(service) ? service[0] : service; // Handle case where service is an array
  const validServiceKey = serviceKey as ServiceKey | undefined; // Type assertion

  return (
    <Hero serviceKey={validServiceKey} />
  );
};

export default ServicePage;