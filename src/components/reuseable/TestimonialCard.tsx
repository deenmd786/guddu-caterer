// TestimonialCard.tsx
import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  title,
  image,
  description,
}) => {
  return (
    <div className="bg-[var(--background-secondary)] shadow-lg rounded-lg overflow-hidden p-6 h-80 md:h-72 mx-2">
      <div className="flex md:items-center lg:items-start">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{name}</h3>
          <p className="text-[var(--text-secondary)] ">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 mt-4">{description}</p>
    </div>
  );
};

export default TestimonialCard;
