// ShimmerPlaceholder.tsx
const ShimmerPlaceholder: React.FC = () => (
    <div className="bg-[var(--background)] rounded-lg shadow-md overflow-hidden w-full">
      <div className="relative h-28 md:h-36 shimmer"></div>
      <div className="text-xs sm:text-sm lg:text-lg font-semibold p-2">
        <div className="h-4 shimmer rounded mb-2"></div>
        <div className="h-2 shimmer rounded mb-1"></div>
        <div className="hidden lg:flex h-2 shimmer rounded mb-3"></div>
        <div className="mt-auto">
          <div className="h-6 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
  
  export default ShimmerPlaceholder;
  