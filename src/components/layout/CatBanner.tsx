"use client";
import React from "react";
import Button from "../reuseable/Button";
import WhatsAppPage from "../../app/dashboard/_components/WhatsAppMessage";

const CatBanner: React.FC = () => {
  return (
    <div
      id="home"
      className="cat-banner-wrapper w-full min-h-screen md:pt-6 bg-cover bg-center flex flex-col items-center justify-center gap-10"
      style={{ backgroundImage: "url('/assets/images/banners/banner.jpg')" }}
    >
      <div className="container px-4   sm:w-4/5 xl:w-3/5 space-y-6 mx-auto text-center">
        <h4 className="text-lg font-semibold">
          <span className="py-2 px-4 bg-opacity-25 text-base lg:text-xl bg-slate-100">
            Creating Unforgettable Events with Exquisite Catering
          </span>
        </h4>
        <h1 className="cat-banner-title text-2xl md:text-4xl lg:text-6xl font-bold my-6 ">
          Discover the Best Catering Services in Delhi with Guddu Catering
        </h1>
        <p className="text-base md:text-lg">
          Guddu Catering offers premium catering solutions for weddings,
          parties, corporate events, and more. We combine traditional
          flavors with modern flair to make your special occasions truly
          remarkable. Trust us to deliver delicious food, stunning
          presentations, and an unparalleled culinary experience tailored
          to your needs.
        </p>
      </div>

      {/* Sticky Button Section */}
      <div className="fixed z-30 md:static bottom-0 left-0 w-full shadow-lg p-4">
        <div className="container mx-auto flex justify-center">
          <div className="flex gap-4 md:flex-row justify-center space-x-4">
            <Button
              href="/dashboard/book-buffet/menu"
              label="Book your buffet"
            />
            <span className="flex md:hidden">
              <WhatsAppPage />
            </span>
            <span className="hidden md:flex">
              <Button
                href="/contact-us"
                className="catr-btn"
                label="Get a free quote"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatBanner;