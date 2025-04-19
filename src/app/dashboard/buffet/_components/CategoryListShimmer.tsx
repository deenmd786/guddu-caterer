"use client";

const CategoryListShimmer = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-8 w-60 bg-gray-300 rounded mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 mb-3 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListShimmer;
