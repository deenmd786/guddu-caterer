"use client";
import React from "react";
import Button from "../reuseable/Button";
import WhatsAppPage from "../../app/dashboard/_components/WhatsAppMessage";

const CatBanner: React.FC = () => {
  return (
    <div
      id="home"
      className="cat-banner-wrapper pt-20 md:pt-28 w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/banners/banner.jpg')" }}
    >
      <div className="container mx-auto min-h-full flex items-center justify-center text-center md:pb-10">
        <div className="w-full lg:w-10/12 md:w-full sm:w-full">
          <div className="cat-banner-text flex h-full justify-center">
            <div className="cat-banner-text-inner max-w-[80%] text-center">
              <h4 className="text-lg font-semibold">
                <span className="py-2 px-4 bg-opacity-25 text-base lg:text-xl bg-slate-100">
                  Planning Fabulous and Delicious Catering Experiences
                </span>
              </h4>
              <h1 className="cat-banner-title text-xl md:text-3xl lg:text-6xl md:leading-relaxed font-bold my-8 md:my-10">
                The Ultimate Catering Experience with Guddu Catering
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-10">
                At Guddu Catering, we specialize in providing exquisite catering
                services for all your events. From weddings to corporate
                gatherings, we bring you exceptional flavors and unforgettable
                experiences tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Button Section */}
      <div className="fixed md:static bottom-0 left-0 w-full shadow-lg p-4 z-50">
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
              {" "}
              <Button
                href="/contact-us"
                className=" catr-btn"
                label="Get a free quote"
              />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatBanner;
