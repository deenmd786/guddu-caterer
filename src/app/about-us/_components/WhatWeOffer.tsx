import Button from '../../../components/reuseable/Button';
import Image from 'next/image';
import React from 'react';

const WhatWeOffer = () => {
  const offerings = [
    {
      title: 'Food and Beverage Catering',
      description:
        'Whether it\'s a wedding, corporate event, or private party, we provide a variety of vegetarian and vegan dishes, expertly crafted to delight your guests.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/PeheEyDHldmzoUf4rLAyQhryQOm2QeFrTeWV6fxhkPsfI1jfTA.jpg',
      imgAlt:
        'A beautifully arranged table with a variety of vegetarian and vegan dishes, including salads, appetizers, and beverages',
    },
    {
      title: 'On-Site Cooking Services',
      description:
        'Our skilled cooks prepare fresh, flavorful meals at your location, including homes, banquet halls, or any event venue.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/o7BaeordsuQ5LKU2aXTL1vGC62W5WIiKonUAUGvedgtMqHfnA.jpg',
      imgAlt:
        'A professional cook preparing fresh meals on-site at an event venue',
    },
    {
      title: 'Tour and Camping Catering',
      description:
        'We accompany you on your travels, offering cooking and catering services for tours, camping trips, and outdoor adventures, ensuring delicious meals no matter where you are.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/HfevA6peFnM1CpInBj0F6eABLGpZV9kD705t7UHI3bYroe4fE.jpg',
      imgAlt:
        'A group of people enjoying a meal outdoors during a camping trip',
    },
    {
      title: 'Langar Facility',
      description:
        'With a deep respect for tradition, we specialize in organizing langar services for religious events and community gatherings, providing wholesome meals with care and dedication.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/PIuUZjio6IY1JNwOmip0irEYCNCLld17P4q0WXiPdc8j6xfJA.jpg',
      imgAlt:
        'A large group of people enjoying a langar meal at a community gathering',
    },
    {
      title: 'Customized Menu Options',
      description:
        'From traditional cuisines to modern favorites, we work with you to create a menu that suits your event’s theme and dietary preferences.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/TVfKAEmv1uy8GSVtECxxES35vvtVtyUKJBTm8LzvecVNqHfnA.jpg',
      imgAlt:
        'A chef presenting a customized menu with a variety of dishes',
    },
    {
      title: 'Impeccable Service',
      description:
        'Our professional team is committed to ensuring a smooth, stress-free experience, handling everything from food preparation to serving and cleanup.',
      imgSrc:
        'https://storage.googleapis.com/a1aa/image/pnF1XTU5O0pME58zBdyvyUPIMntpHGSgLaMjww8sfyiJ1jfTA.jpg',
      imgAlt:
        'A professional catering team serving food at an event',
    },
  ];

  return (
    <div className="container py-8 mx-auto px-4 relative z-10" style={{
        fontFamily: "'Roboto', sans-serif",
      }}>
            <h2 className="text-[var(--button)] text-xl text-center font-bold mb-8 pb-3 border-b border-[var(--border)]">-- What We Offer --</h2>

      <p className="text-center mb-12 md:text-lg">
        At Guddu Catering Service, we provide a wide range of catering and cooking services designed to meet your unique needs. Here’s how we make your events and occasions truly special:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering, index) => (
          <div
          key={index}
          className="relative bg-[var(--background-secondary)] h-[24rem] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          <Image
            width={400}
            height={400}
            alt={offering.imgAlt}
            className="w-full h-40 object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
            src={offering.imgSrc}
          />
          <div className="p-4">
            <h3 className="text-lg md:text-xl text-[var(--text-red)] font-semibold mt-2">{offering.title}</h3>
            <p className="mt-1 text-sm md:text-base text-[var(--text-primary)]">{offering.description}</p>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button label="Enquiry" href="/contact-us" />
          </div>
        </div>
        
        
        ))}
      </div>
      <p className="text-center mt-12 text-gray-900 font-semibold">
        No matter the occasion, we bring quality, taste, and reliability to every plate, making your event unforgettable.
      </p>
    </div>
  );
};

export default WhatWeOffer;
