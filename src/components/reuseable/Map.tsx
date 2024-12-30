"use client";

import React from "react";

const Map: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-lg h-56 md:h-[435px]"> 
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1032.8912670370755!2d77.0514321882954!3d28.642387762387887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0504c7d3e3c9%3A0x5b38575d481d0a6a!2sKetan%20Trading%20Company!5e0!3m2!1sen!2sin!4v1734348301031!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg w-full h-full"
          title="Map Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;