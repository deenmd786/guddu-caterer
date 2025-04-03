"use client"; // This directive indicates that the component should be rendered on the client side

import React, { useEffect, useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import BuffetSection from "./BuffetSection"; // Adjust the import based on your project structure
import { getBuffetbyCategory } from "@/utils/buffetController";
import { useParams } from "next/navigation";

const BuffetList = () => {
  const [buffets, setBuffets] = useState<IBuffetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number>(50);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchBuffets = async () => {
      setLoading(true);
      try {
        // Fetch buffets based on the category from the URL
        const result = await getBuffetbyCategory("Wedding");
        if ("buffets" in result) {
          setBuffets(result.buffets || []);
        } else {
          setError(result.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError("Failed to fetch buffets. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchBuffets();
    }
  }, [category]);

  const handlePeopleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeople(Number(event.target.value));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading buffets...</p>
      </div>
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
    <div className="container mx-auto p-6">
      {/* Select Number of People */}
      <div className="mb-6 flex justify-between items-center gap-4">
        <label htmlFor="people-select" className="text-lg font-semibold text-gray-700">
          Select Number of Guests:
        </label>
        <div className="relative w-52">
          <select
            id="people-select"
            value={selectedPeople}
            onChange={handlePeopleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 text-lg focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out appearance-none cursor-pointer"
          >
            {[50, 100, 200, 500, 1000].map((num) => (
              <option key={num} value={num} className="p-2 text-lg bg-white hover:bg-gray-100">
                {num} Guests
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
      </div>

      {/* Buffet Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
        {buffets.map((buffet) => (
          <BuffetSection
            key={buffet._id}
            selectedPeople={selectedPeople}
            initialData={buffet}
          />
        ))}
      </div>
    </div>
  );
};

export default BuffetList;