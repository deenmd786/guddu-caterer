"use client"; // This directive indicates that the component should be rendered on the client side

import React, { useEffect, useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { getBuffetbyCategory } from "@/utils/buffetController";
import { useParams } from "next/navigation";
import SimmerBuffetCard from "./SimmerBuffetCard";
import BuffetSection from "../[category]/_components/BuffetSection";

const BuffetList = () => {
  const [buffets, setBuffets] = useState<IBuffetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedPeople, setSelectedPeople] = useState<number>(50);
  // const [selectedQuality, setSelectedQuality] = useState<string>("standard");

  const { category } = useParams<{ category: string }>();  

  // const qualityPricing: Record<string, number> = {
  //   medium: 10,
  //   standard: 0,
  //   premium: -10,
  // };

  useEffect(() => {
    const fetchBuffets = async () => {
      setLoading(true);
      try {
        const result = await getBuffetbyCategory(category);
        
        if ("buffets" in result) {
          setBuffets(result.buffets || []);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error fetching buffets:", err);
        setError("Failed to fetch buffets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchBuffets().then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    
  }, [category]);

  // const handlePeopleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedPeople(Number(event.target.value));
  // };

  // const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedQuality(event.target.value);
  // };

  if (loading) {
    return (
      <SimmerBuffetCard />

    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-3">
    {/* Filters Row */}
    <div className="flex justify-between items-center gap-4 mb-3">
      {/* Quality Selection */}
      {/* <div className="w-full sm:w-1/2 md:w-1/3">
        <label htmlFor="quality-select" className="block text-sm md:text-base font-semibold text-gray-700 mb-1">
          Select Quality:
        </label>
        <div className="relative">
          <select
            id="quality-select"
            value={selectedQuality}
            onChange={handleQualityChange}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 text-sm md:text-base focus:ring-2 focus:ring-primary focus:outline-none appearance-none cursor-pointer"
          >
            {Object.keys(qualityPricing).map((quality) => (
              <option key={quality} value={quality}>
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
      </div> */}

      {/* People Selection */}
      {/* <div className="w-full sm:w-1/2 md:w-1/3">
        <label htmlFor="people-select" className="block text-sm md:text-base font-semibold text-gray-700 mb-1">
          Select Guests:
        </label>
        <div className="relative">
          <select
            id="people-select"
            value={selectedPeople}
            onChange={handlePeopleChange}
            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 text-sm md:text-base focus:ring-2 focus:ring-primary focus:outline-none appearance-none cursor-pointer"
          >
            {[50, 100, 200, 500, 1000, 2000].map((num) => (
              <option key={num} value={num}>
                {num}+ Guests
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
      </div> */}
    </div>
    {/* Buffet Cards */}
    <div className="grid pb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
      {buffets.map((buffet) => (
        <BuffetSection
          key={buffet._id}
          // selectedPeople={selectedPeople}
          initialData={buffet}
          // selectedQualityPercent={qualityPricing[selectedQuality]}
        />
      ))}
    </div>
  </div>
);
};

export default BuffetList;
