// components/Hero.tsx

import React from "react";
import Image from "next/image";
import Button from "../reuseable/Button";
import Logo from "../reuseable/Logo";
import { servicesData, ServiceKey } from "../../data/servicesData"; // Import the services data and ServiceKey type

interface HeroProps {
  serviceKey: ServiceKey | undefined;
}

const Hero: React.FC<HeroProps> = ({ serviceKey }) => {
  // Fallback data if service is not found
  const serviceData =
    serviceKey && servicesData[serviceKey]
      ? servicesData[serviceKey]
      : {
          image: "/assets/default.jpg", // Default image
          altText: "Default service image",
          title: "Service Not Found",
          description: "The requested service is not available.",
        };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          alt={serviceData.altText}
          src={serviceData.image}
          fill
          priority
          className="opacity-60" 
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white max-w-[90vw] px-6 sm:px-8 lg:px-10">
        <div className="mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          {serviceData.title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
          {serviceData.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Button href="/contact-us" label="Request a Quote" />
          <Button href="/#menu" className="catr-btn" label="Explore Menus" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
