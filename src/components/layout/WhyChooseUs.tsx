import React from "react";
import Image from "next/image";

const stats = [
  { count: 300, label: "Happy Customers", icon: "/assets/images/icons/1.png" },
  { count: 40, label: "Expert Cooks", icon: "/assets/images/icons/2.png" },
  {
    count: 23,
    label: "Years of Experience",
    icon: "/assets/images/icons/3.png",
  },
  { count: 500, label: "Events Completed", icon: "/assets/images/icons/4.png" },
];

const WhyChooseUs: React.FC = () => (
  <div id="choose-us" className="bg-[var(--background)] py-12">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-[var(--text-red)] text-xl font-bold mb-8 pb-3 border-b border-red-600">
        Why Choose Our Catering Services
      </h1>
      <h2 className="font-GreatVibes text-2xl md:text-4xl tracking-widest mb-3">
        Committed to <span className="text-[var(--text-red)]">Excellence in Event Catering</span>
      </h2>
      <div className="flex w-full mx-auto flex-col lg:flex-row gap-8 items-center">
        {/* Image Section */}
        <Image
          width={300}
          height={300}
          src="/assets/images/banners/story.png"
          alt="Why Choose Guddu Catering Services for your event"
          className="w-full lg:w-[35%] max-h-screen object-contain"
        />
        {/* Text and Stats Section */}
        <div className="w-full lg:w-2/3 ">
          <p className="mb-6 text-lg text-[var(--text-black)] leading-relaxed">
            At Guddu Catering Services, we focus on:
            <br />
            <br />
            <span className="hover:text-[var(--text-red)] transition-colors duration-300">
              <strong>Expert Cooking</strong>
            </span>
            : A variety of delicious dishes, perfect for your event.
            <br />
            <span className="hover:text-[var(--text-red)] transition-colors duration-300">
              <strong>Easy Event Planning</strong>
            </span>
            : Custom options for a stress-free, personalized experience.
            <br />
            <span className="hover:text-[var(--text-red)] transition-colors duration-300">
              <strong>Reliable Service</strong>
            </span>
            : Fresh, tasty food delivered on time for your guests&apos; enjoyment.
            <br />
            <span className="hover:text-[var(--text-red)] transition-colors duration-300">
              <strong>Fresh and On-Time Food Delivery</strong>
            </span>
            : Always ensuring timely delivery of hot, fresh food to your event.
            <br />
          </p>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:mx-auto">
            {stats.map(({ count, label, icon }) => (
              <div
                key={label}
                className="bg-[var(--background-secondary)] lg:w-36 xl:w-44 p-4 rounded-lg text-center shadow"
              >
                <Image
                  width={70}
                  height={70}
                  src={icon}
                  alt={`${label} for Guddu Catering Services`}
                  className="object-contain mx-auto"
                />
                <h3 className="text-2xl font-bold text-[var(--text-black)]">
                  {count}
                </h3>
                <p className="text-[var(--text-primary)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseUs;
