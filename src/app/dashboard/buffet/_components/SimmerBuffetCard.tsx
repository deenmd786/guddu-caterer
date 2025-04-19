import React from "react";

const SimmerBuffetCard = () => {
  return (
    <section className="p-4 sm:p-6 bg-white shadow-lg rounded-lg border animate-pulse">
      {/* Top Info Section */}
      <div className="bg-gray-100 mt-6 shadow-lg rounded-lg border animate-pulse">
        <div className="flex justify-around gap-3 items-center bg-white px-4 py-2 rounded-t">
          <div className="h-5 w-24 bg-gray-400 rounded"></div>
          <div className="h-5 w-24 bg-gray-400 rounded"></div>
        </div>

        <div className="flex justify-around gap-3 items-center bg-white px-4 py-2 rounded-b">
          <div className="h-6 w-28 bg-gray-300 rounded"></div>
          <div className="h-6 w-28 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Main Card Skeleton */}
      <div className="p-4 bg-white shadow-lg rounded-lg border ">
        {/* Top Label and Circle */}
        <div className="flex justify-around items-center px-4 py-2">
          <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-400 rounded"></div>
          <div className="h-8 w-32 bg-gray-400 rounded"></div>
          </div>
          <div className="h-16 w-16 bg-red-400 rounded-full"></div>
        </div>

        {/* Category Skeleton */}
        <div className="mt-6 flex gap-2 overflow-x-auto mb-2 pb-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-2 rounded-lg bg-gray-100 w-20"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-2" />
              <div className="h-4 w-12 bg-gray-300 rounded mb-1" />
              <div className="h-3 w-10 bg-gray-300 rounded" />
            </div>
          ))}
        </div>

        {/* Dish Cards Skeleton */}
        <div className="pb-2 flex gap-2 overflow-x-auto">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="w-40 h-24 bg-gray-200 rounded-md"></div>
          ))}
        </div>

        {/* Price Section Skeleton */}
        <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-lg flex justify-between items-center mt-4">
          <div className="flex flex-col space-y-3 w-full">
            <div className="flex justify-between items-center">
              <div className="h-4 w-36 bg-gray-300 rounded" />
              <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-6 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimmerBuffetCard;
