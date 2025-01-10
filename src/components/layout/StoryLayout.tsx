import React from "react";
import Image from "next/image";
import OurStory from "../reuseable/OurStory";

const LayoutWithImages: React.FC = () => {
  return (
    <div className="py-4 md:py-12 flex flex-col md:flex-row items-center w-full justify-center bg-[var(--background)]">
      {/* Left Image */}
      <div className="hidden md:flex flex-1 relative h-[500px]">
        {/* Hide on small screens */}
        <Image
          alt="Spices used in Guddu Catering's dishes"
          src="/assets/images/banners/spices-left.png"
          fill
          style={{ objectFit: "scale-down" }}
          className="rounded-l-lg"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Our Story Component */}
      <div className="flex-1 z-0">
        <OurStory />
      </div>

      {/* Right Image */}
      <div className="hidden md:flex flex-1 relative h-[500px]">
        {/* Hide on small screens */}
        <Image
          alt="Fresh spices for event catering"
          src="/assets/images/banners/spices-right.png" // Replace with your image URL
          fill
          style={{ objectFit: "scale-down" }}
          className="rounded-r-lg"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default LayoutWithImages;
