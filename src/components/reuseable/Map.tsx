"use client";

import React from "react";

const Map: React.FC = () => {
  return (
    <div className="flex justify-center  items-center">
      <div className="relative w-full max-w-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5732857906187!2d77.0508471!3d28.642548500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d058c3e865e99%3A0xdbfae67d8971c759!2sGuddu%20Caterer!5e0!3m2!1sen!2sin!4v1756636799547!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg w-full min-h-[50vh] md:min-h-[72vh]"
          title="Map Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
