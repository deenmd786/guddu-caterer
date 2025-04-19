"use client";

import { useEffect, useState } from "react";
import CategoryList from "./_components/CategoryList";
import CategoryListShimmer from "./_components/CategoryListShimmer"; // Import the shimmer

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (or use real data fetching logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second fake loading

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <CategoryListShimmer /> : <CategoryList />;
};

export default Page;
