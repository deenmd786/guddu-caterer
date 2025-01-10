import React from 'react';
import Image from 'next/image';
import { Great_Vibes } from 'next/font/google';

// Importing the Great Vibes font with required weight
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400', // Specify the weight
  display: 'swap', // This helps in reducing layout shifts
});

const OurStory: React.FC = () => {
  return (
    <div className="bg-white min-h-[24rem] p-8 border-8 border-black shadow-lg text-center relative max-w-lg mx-auto">
      <Image
        alt="Decorative background image of a catering setup"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        height={400}
        src="https://storage.googleapis.com/a1aa/image/asvZZ2bpP7p4PJFcnByPE2brB4P4uRLkkC7Et2AM99364QeJA.jpg"
        width={600}
      />
      <div className="relative z-10">
        <h1 className={`title text-4xl text-rose-600 mb-2 ${greatVibes.className}`}>
          Our Story
        </h1>
        <h2 className="subtitle text-3xl text-gray-800 mb-4 font-serif">
          LOVE FOR FOOD
        </h2>
        <div className="flex justify-center items-center mb-2">
          <span className="text-gray-400 mx-2">-</span>
          <i className="fas fa-circle text-gray-400 mx-2"></i>
          <span className="text-gray-400 mx-2">-</span>
        </div>
        <p className="text-gray-600 leading-relaxed">
          At <strong>Guddu Catering Service</strong>, our story is built on a passion for food, a commitment to excellence, 
          and a desire to make every event extraordinary. For over <strong>23 years</strong>, we have delighted guests with exceptional 
          culinary experiences, offering a blend of tradition and innovation.
          <br />
          <br />
          With a dedicated team of <strong>40 expert cooks</strong>, we have catered to many weddings, corporate events, and 
          private gatherings, making each moment special. Our expertise spans across cuisines, ensuring every dish is a perfect 
          symphony of flavors.
          <br />
          <br />
          Having successfully completed over <strong>150 events</strong>, we pride ourselves on delivering not just food but 
          unforgettable memories. We believe in using only the finest, freshest ingredients to bring your vision to life. 
          Whether it&apos;s an intimate celebration or a grand affair, we are here to serve you with unparalleled dedication.
          <br />
          <br />
          Welcome to Guddu Catering Service, where every bite tells a story of love, quality, and creativity.
        </p>
      </div>
    </div>
  );
};

export default OurStory;
