"use client";
import React from "react";
import Image from "next/image";
import { FaPhone, FaComments, FaCalendarAlt } from "react-icons/fa"; // Importing React Icons
import Button from "../../components/reuseable/Button";
import Logo from "../../components/reuseable/Logo";
import EnquiryForm from "../../components/reuseable/EnquiryForm";
import Map from "../../components/reuseable/Map";

const ContactUs: React.FC = () => (
  <div className="bg-white font-LexendDeca text-[var(--text-primary)] pt-24 pb-6">
    <div className="container mx-auto px-4">
      <span className="absolute top-10 left-20">
        <Logo />
      </span>
      {/* Flex container for text and image */}
      <div className="">
        {/* Text and img section*/}
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <div className="w-full lg:w-1/2 pl-4 lg:pl-20">
            <h1 className="text-[var(--text-red)] text-3xl lg:text-4xl font-bold mb-4">
              Contact Us About HubSpot’s Software
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We’d love to show you how you can get more traffic and leads,
              increase your sales productivity, provide better customer service,
              or all of the above! Here are a few ways to reach out to our sales
              team.
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
            <Image
              width={500}
              height={300}
              src="https://storage.googleapis.com/a1aa/image/k9NXFrflQ93XFCeJ7D0PeDOMpz1u06KUf8nI7wJZDCC8wltPB.jpg"
              alt="Person with headphones talking"
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        </div>

        <div className="w-full relative -top-20 px-4 flex flex-col items-center"> {/* Center items */}
  {/* Adjusting the position of the boxes */}
  <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full">
    <div className="bg-[var(--background-secondary)] p-8 rounded-lg text-center w-full md:w-1/3 h-64 flex flex-col justify-between"> {/* Added flex properties */}
      <div className="my-auto">
        <FaPhone className="text-gray-500 mb-4 text-3xl mx-auto" />
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Call us directly
        </h2>
        <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          09278422964
        </p>
        <a className="text-blue-600" href="#">
          See more local numbers
        </a>
      </div>
    </div>
    <div className="bg-[var(--background-secondary)] p-8 rounded-lg text-center w-full md:w-1/3 h-64 flex flex-col justify-between"> {/* Added flex properties */}
      <div className="my-auto">
        <FaComments className="text-gray-500 mb-4 mx-auto text-3xl" />
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Chat with our sales team
        </h2>
        <Button label="Chat with Sales" href="#" />
      </div>
    </div>
    <div className="bg-[var(--background-secondary)] p-8 rounded-lg text-center w-full md:w-1/3 h-64 flex flex-col justify-between"> {/* Added flex properties */}
      <div className="my-auto">
        <FaCalendarAlt className="text-gray-500 mb-4 mx-auto text-3xl" />
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Get a product demo
        </h2>
        <Button label="Get a demo" href="#" />
      </div>
    </div>
  </div>
</div>
      </div>
      <div className="w-full">
        <h1 className="text-[var(--text-red)] text-center text-4xl font-bold mb-8">
          Book Appointment
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-5 lg:gap-20">
          {/* Form Section */}
          <div className="max-w-lg w-full">
            <EnquiryForm />
          </div>
          {/* Map Section */}
          <div className="w-full md:max-w-lg" >
            <Map />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;