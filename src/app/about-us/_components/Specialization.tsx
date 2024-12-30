import Image from 'next/image';
import React from 'react';

const Specialization = () => {
  return (
    <div
      className="bg-[var(--background-secondary)] py-8 mx-auto px-20 relative z-10"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="flex items-center flex-col">
      <h2 className="text-[var(--border)] text-xl text-center font-bold mb-8 pb-3 border-b border-[var(--border)]">-- Our Specialization --</h2>

      </div>
      <p className="text-center mb-12 md:text-lg">
        We pride ourselves on being experts in vegetarian and vegan catering, offering a diverse range of dishes to suit every taste. Whether you’re hosting a family gathering, corporate event, or wedding, we specialize in:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Vegetarian Cuisine',
            description: 'Crafted with fresh, high-quality ingredients, our vegetarian dishes are flavorful and wholesome.',
            imgSrc: '/assets/images/main/vegetarian.webp',
            imgAlt: 'A variety of colorful and fresh vegetarian dishes',
          },
          {
            title: 'Vegan Options',
            description: 'From plant-based appetizers to full-course vegan meals, we create dishes that cater to those who prefer or require vegan choices.',
            imgSrc: '/assets/images/main/vegan.jpg',
            imgAlt: 'A selection of vegan dishes including salads and main courses',
          },
          {
            title: 'Other Veg Categories',
            description: 'We accommodate specific dietary preferences within the vegetarian spectrum, ensuring your guests have delicious and satisfying options.',
            imgSrc: '/assets/images/main/other-vegetairian.jpg',
            imgAlt: 'A variety of vegetarian dishes catering to specific dietary preferences',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative bg-[var(--background)] h-[24rem] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <Image
            width={400}
            height={300}
              alt={item.imgAlt}
              className="w-full h-48 object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
              src={item.imgSrc}
            />
            <div className="p-4">
              <h3 className="text-lg md:text-xl  text-[var(--text-secondary)] font-semibold mt-2">
                {item.title}
              </h3>
              <p className="mt-1 text-sm md:text-base text-[var(--text-primary)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-12 text-gray-900 md:text-base font-semibold">
        Our focus is on health, flavor, and variety, making us the perfect choice for those seeking ethical and delectable catering services.
      </p>
    </div>
  );
};

export default Specialization;
