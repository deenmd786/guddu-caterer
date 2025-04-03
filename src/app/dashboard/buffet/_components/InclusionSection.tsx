"use client"
import React, { useState } from "react";
import {
  FaUtensils,
  FaUserTie,
  FaLeaf,
  FaBlender,
  FaConciergeBell,
  FaInfoCircle,
} from "react-icons/fa";

const InclusionSection: React.FC = () => {
  const [showIncludes, setShowIncludes] = useState(false);

  return (
    <div className="relative">
      {/* Info Icon */}
      <div
        className="cursor-pointer flex items-center gap-1 text-gray-700 hover:text-gray-900"
        onClick={() => setShowIncludes((prev) => !prev)}
      >
        <FaInfoCircle className="text-blue-500 text-lg" />
        <span className="text-sm">See Details</span>
      </div>

      {/* Includes Section */}
      {showIncludes && (
        <div className="absolute left-[-33px] sm:left-[-97px] bottom-10 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-20">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
            What&apos;s Included:
          </h4>
          <ul className="space-y-3 text-gray-700">
            {[
              { icon: FaUtensils, text: "On-Spot Cooking" },
              { icon: FaUserTie, text: "Chef & Staff" },
              { icon: FaLeaf, text: "Fresh Ingredients" },
              { icon: FaBlender, text: "Cooking Equipment" },
              { icon: FaConciergeBell, text: "Disposable Plates & Napkins" },
            ].map(({ icon: Icon, text }, index) => (
              <li key={index} className="flex items-center gap-3 text-base">
                <Icon className="text-green-600" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InclusionSection;
