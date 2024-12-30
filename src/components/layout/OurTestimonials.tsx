import React from 'react';
import TestimonialSlider from '../ui/TestimonialSlider';

const OurTestimonials: React.FC = () => {
  return (
    <div id="testimonials" className=" bg-[var(--background)]">
      <div className="container mx-auto p-4">
        <div className="text-center mb-12">
          <h1 className="text-[var(--text-red)] text-xl font-bold mb-8 border-b pb-3 border-[var(--border)]">
            -- What Our Clients Say --
          </h1>
          <h2 className={`font-GreatVibes  text-2xl md:text-4xl tracking-widest`}>
            Hear From Our <span className="text-[var(--text-red)]">Happy Clients</span>
          </h2>
        </div>
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default OurTestimonials;
