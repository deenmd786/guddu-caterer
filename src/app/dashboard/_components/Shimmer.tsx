const Shimmer: React.FC = () => {
    return (
        <div className="animate-pulse bg-gray-300 rounded-lg shadow-md overflow-hidden sm:w-[108px] md:w-[136px] lg:w-32  lg:text-center xl:w-36">
            {/* Image Placeholder */}
            <div className="relative h-20 md:h-24 lg:h-28 bg-gray-400 shimmer"></div>
            {/* Content Placeholder */}
            <div className="p-2 flex flex-col">
                <div className="h-4 bg-gray-400 rounded shimmer"></div>
                <div className="hidden sm:block h-4 bg-gray-400 rounded shimmer"></div>
                <div className="hidden lg:block h-4 bg-gray-400 rounded shimmer"></div>
                <div className="h-6 bg-gray-500 rounded shimmer"></div>
            </div>
        </div>
    );
};

export default Shimmer;
