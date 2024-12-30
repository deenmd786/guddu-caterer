// components/WhyChooseUs.tsx

import React from 'react';
import Image from 'next/image';

interface CardProps {
  imgSrc: string;
  altText: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, altText, title, description }) => (
  <div className="bg-[var(--background-secondary)] rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105">
    <Image alt={altText} className="mx-auto mb-4" height={100} src={imgSrc} width={100} />
    <h3 className="text-xl text-[var(--text-red)] font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
    const cardsData = [
        {
          imgSrc: "https://storage.googleapis.com/a1aa/image/jL1bRjaFs8qJLJQDYvsNXuFbfacUyksVIgNisYjZBFzGE39JA.jpg",
          altText: "Experienced catering team with chef's hat and utensils",
          title: "Experienced Team",
          description: "Our professional team has extensive experience in catering for weddings, parties, and corporate events, making your occasions stress-free and memorable.",
        },
        {
          imgSrc: "https://storage.googleapis.com/a1aa/image/8f5vU9GNQ7QvDSHAzKOZ5oP6F2Nz7Fi1q73HhTp5sFEnG29JA.jpg",
          altText: "Customized menus with a menu card and pencil for personalization",
          title: "Tailored Menus",
          description: "We design personalized menus to match your event's theme and individual preferences, ensuring a unique and unforgettable dining experience.",
        },
        {
          imgSrc: "https://storage.googleapis.com/a1aa/image/h87aJxFzgkYkBVXfnAFeY9dc2VI6aTW1AIPeCsYvaQvbaY3nA.jpg",
          altText: "Premium ingredients symbolized by a leaf and checkmark",
          title: "Premium Ingredients",
          description: "We use the highest quality ingredients to craft delicious dishes, guaranteeing freshness and exceptional taste for your guests.",
        },
        {
          imgSrc: "https://storage.googleapis.com/a1aa/image/oxXBTwk8qAbedy3MKSJiBaha8DWPzowiqjqXoITVfPYHIu7TA.jpg",
          altText: "Professional waiter serving with precision and care",
          title: "Exceptional Service",
          description: "Our team delivers top-notch service, ensuring a seamless and enjoyable experience for you and your guests.",
        },
        {
          imgSrc: "https://storage.googleapis.com/a1aa/image/hSm53ivntPr5DRz1FXIdacGzFdO6FX3jYIAUEgMboqgCi7eJA.jpg",
          altText: "Magnifying glass and checklist symbolizing attention to detail",
          title: "Attention to Detail",
          description: "We meticulously manage every aspect of catering, from food preparation to service, ensuring a flawless and tension-free experience.",
        },
        {
            imgSrc:"https://storage.googleapis.com/a1aa/image/W5UlFawKBkIkFNirEb0ZgLaG1lA99VR0MeTjwPeo4OB9mu7TA.jpg",
          altText: "Celebration scene with diverse event setups",
          title: "Versatile Event Coverage",
          description: "Whether it’s a wedding, corporate event, or private party, our catering services adapt to your needs, making every occasion extraordinary.",
        },
      ];
      
      

  return (
    <div className="py-16 bg-[var(--background)]">
      <div className="container mx-auto px-4">
      <div className="text-center text-[var(--text-primary)] pt-8">
      <h1 className="text-[var(--text-red)] text-xl font-bold mb-8 pb-3 border-b border-[var(--border)]">-- Why Choose Us --</h1>
<h2 className="font-GreatVibes text-2xl md:text-4xl mb-6 tracking-widest">
  Elevate Your Dining Experience with Our <span className="text-[var(--text-red)]">Buffet Services</span>
</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;