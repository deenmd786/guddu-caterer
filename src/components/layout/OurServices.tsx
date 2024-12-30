import React from 'react';
import linksData from "../../data/linksData"; // Ensure this is correctly typed
import ImageCard from '../reuseable/ImgServiceCard';



type Service = {
  href: string;
  label: string;
  description: string;
  imageUrl?: string; // Make imageUrl optional
};

const OurServices: React.FC = () => {
  return (
    <div className="md:py-12 bg-[var(--background-secondary)]">
      <div id="scroll-down-section" className='container mx-auto p-4'>
      <div className="text-center mb-12">
      <h1 className="text-[var(--text-red)] text-xl font-bold mb-8 border-b pb-3 border-red-600"> -- Our Services --</h1>
      <h2 className={`font-GreatVibes  text-2xl md:text-4xl mb-6 tracking-widest`}>Designed to Meet Your <span className="text-[var(--text-red)]">Needs</span></h2>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4 md:hidden"> {/* Only visible on mobile */}
            {linksData.services.map((service: Service) => (
              <a key={service.href} href={service.href} className="hover:no-underline w-48 flex-shrink-0"> {/* Prevent shrinking */}
                <div className="flex flex-col items-center">
                  <ImageCard imageUrl={service.imageUrl || "https://via.placeholder.com/300"} altText={service.label} description={service.description} />
                  <span className="mt-2 text-lg font-semibold text-[var(--text-black)]">{service.label}</span>
                </div>
              </a>
            ))}
          </div>
          
      <div id='services' className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {linksData.services.map((service: Service) => (
          <a key={service.href} href={service.href} className="hover:no-underline">
            <div className="flex flex-col items-center">
              <ImageCard imageUrl={service.imageUrl || "https://via.placeholder.com/300"} altText={service.label} description={service.description} />
              <span className="mt-2 text-lg font-semibold text-[var(--text-black)] ">{service.label}</span>
            </div>
          </a>
        ))}
      </div>
      </div>
    </div>
  );
};

export default OurServices;