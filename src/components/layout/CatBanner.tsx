"use client";
import React from "react";
import Button from "../reuseable/Button";
import WhatsAppPage from "../../app/dashboard/_components/WhatsAppMessage";

const CatBanner: React.FC = () => {
 
  
  return (
    <section
      className="cat-banner-wrapper w-full min-h-screen md:pt-10 bg-cover bg-center  flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/assets/images/banners/banner.jpg')",
        backgroundSize: "100% 100%",
      }}
      role="banner"
    >
      <div className="container px-4 sm:w-4/5 xl:w-3/5 mx-auto text-center">
        <h4
          className="text-xl font-semibold"
          aria-label="Exquisite Catering Services"
        >
          <span className="py-2 px-4 bg-opacity-25 text-base lg:text-xl bg-slate-100">
            Creating Unforgettable Events with Exquisite Catering
          </span>
        </h4>
        <h1 className="cat-banner-title text-2xl md:text-5xl lg:text-6xl font-bold my-4">
          Discover the Best Veg Menu for Catering Services in Delhi with Guddu
          Catering
        </h1>
        <p className="md:text-lg">
          Guddu Catering offers premium catering solutions for weddings,
          parties, corporate events, and more. We combine traditional flavors
          with modern flair to make your special occasions truly remarkable.
          Trust us to deliver delicious food, stunning presentations, and an
          unparalleled culinary experience tailored to your needs.
        </p>
      </div>

      {/* Sticky Button Section */}
      {/* Sticky Button Section */}
<div
  className="fixed md:static md:pt-10 z-30 bg-[var(--background-secondary)] bottom-0 left-0 w-full shadow-lg p-2 md:p-4 md:bg-transparent"
  role="complementary"
>
  <div className="container mx-auto flex justify-center">
    <div className="flex gap-4 md:flex-row justify-center space-x-6 text-center">
      <Button href="/dashboard/book-buffet/menu" label="Book Your Buffet" />
      <span className="flex md:hidden" aria-hidden="true">
        <WhatsAppPage />
      </span>
      <span className="hidden md:flex">
        <Button
          href="/contact-us"
          className="catr-btn"
          label="Get a Free Quote"
        />
      </span>
    </div>
  </div>
</div>
    </section>
  );
};

export default CatBanner;