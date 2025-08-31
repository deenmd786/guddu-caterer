"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const Footer: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleNavigation = (section: string) => {
    if (section === "menu") {
      router.push('/dashboard/book-buffet/menu'); // Navigate to the desired route
    } else {
      // For other sections, use the default behavior
      const href = section === "about-us" || section === "contact-us" ? `/${section}` : `/#${section}`;
      window.location.href = href; // Fallback for other sections
    }
  };
  return (
    <div className="bg-[var(--background-secondary)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Catering */}
          <div className="text-center md:text-left">
            <h2 className="text-[var(--text-secondary)] text-xl font-bold mb-2">
              About Guddu Catering
            </h2>
            <div className="border-b-2 border-[--text-secondary] w-16 mx-auto md:mx-0 mb-4"></div>
            <p className="text-[var(--text-primary)] mb-4">
              Guddu Catering delivers exceptional services with live cooking, customized buffets, and delicious flavors. From weddings to corporate events, we make every gathering unforgettable.
            </p>
          </div>
          {/* Footer Links */}
          <div className="text-center md:text-left">
            <h2 className="text-[var(--text-secondary)] text-xl font-bold mb-2">
              Quick Links
            </h2>
            <div className="border-b-2 border-[var(--text-secondary)] w-16 mx-auto md:mx-0 mb-4"></div>
            <ul className="text-[var(--text-primary)] text-start pl-10 space-y-1">
              {["home", "services", "menu", "about-us", "contact-us"].map((section) => (
                <li key={section}>
                <a
                  onClick={() => handleNavigation(section)} // Use onClick to handle navigation
                  className="inline-flex items-center text-[var(--text-primary)] hover:text-[var(--text-secondary)] cursor-pointer" // Add cursor-pointer for better UX
                >
                  <FaArrowRight className="text-[var(--text-secondary)] mr-2" />
                  {section.replace("-", " ").toUpperCase()}
                </a>
              </li>
              ))}
            </ul>
          </div>
          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h2 className="text-[var(--text-secondary)] text-xl font-bold mb-2">
              Contact Us
            </h2>
            <div className="border-b-2 border-[--text-secondary] w-16 mx-auto md:mx-0 mb-4"></div>
            <ul className="text-[var(--text-primary)] space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-[--text-secondary] mr-2" />
                6-b/3, Bheem Enclave, Uttam Nagar, South-West Delhi-59
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-[--text-secondary] mr-2 " />
                (+91) 8750838486
              </li>
              <li className="flex items-center">
                <FaClock className="text-[--text-secondary] mr-2" />
                24/7 Hours Service
              </li>
            </ul>
          </div>
          {/* Social Gallery */}
          <div className="text-center md:text-left">
            <h2 className="text-[--text-secondary] text-xl font-bold mb-2">
              Social Gallery
            </h2>
            <div className="border-b-2 border-[--text-secondary] w-16 mx-auto md:mx-0 mb-4"></div>
            <div className="grid grid-cols-3 gap-2">
              {[
                "XibTfpXKwNWVfkCxiqxKifwxxJbLujKyfpSc25jYxJ4DzLwPB.jpg",
                "eo5wBer6uvmUqkpkDAKITChPLmK7Vza27HAhN1X0PDEx8C8TA.jpg",
                "D1I0iU1YeYwlRyeAOHFS7L4OzfjQtSPUEh9Vfzbeg5z8lXgfE.jpg",
                "sEdmYDsljVpfPqCfEellE2M73JyS8bq2c7bYnI1MKRbd5F4nA.jpg",
                "OOCmCQBnTZqnLJkfJVgl8k9gfsdZMQUzWkeeEE4MRWtQzLwPB.jpg",
                "QjAq2vedfYmOWkxgAalQxTqOPfYrVEqKwKZnq3QPIwOn5F4nA.jpg",
              ].map((img, index) => (
                <Image
                  key={index}
                  alt={`Gallery image ${index + 1}`}
                  className="rounded-lg"
                  height="200"
                  src={`https://storage.googleapis.com/a1aa/image/${img}`}
                  width="200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
