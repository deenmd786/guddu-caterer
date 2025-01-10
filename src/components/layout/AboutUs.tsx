import React from "react";
import Image from "next/image";
import Button from "../reuseable/Button";

const AboutUs: React.FC = () => (
  <section
    id="about"
    className="bg-[var(--background)] py-12"
    role="region"
    aria-labelledby="about-us-heading"
  >
    <div className="container mx-auto px-4">
      {/* Full-width headings */}
      <h1
        id="about-us-heading"
        className="text-[var(--text-red)] text-xl font-bold text-center border-b pb-3 mb-8 border-red-600"
      >
        -- About Us --
      </h1>
      <h2
        className="font-GreatVibes text-2xl md:text-4xl tracking-widest text-center"
        aria-label="Committed to Quality"
      >
        Committed to{" "}
        <span className="text-[var(--text-red)]">Quality</span>
      </h2>

      {/* Flex container for text and image */}
      <div className="flex flex-col lg:flex-row items-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 mb-6 p-4 md:p-10">
          <p
            className="mb-6 md:text-lg text-[var(--text-black)] leading-relaxed"
            aria-label="About our services"
          >
            At Guddu Catering Service, we pride ourselves on our commitment to
            quality and customer satisfaction. Our team of expert cooks is
            dedicated to providing delicious and fresh food for all types of
            events. We believe in making your experience as seamless as
            possible, from planning to execution.
          </p>
          <Button label="Learn More" href="/about-us" />
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width={300}
            height={300}
            src="/assets/images/banners/about-us.png"
            alt="About Guddu Catering Service"
            className="object-cover w-96"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);

export default AboutUs;