"use client";
import { RootState } from "../../../redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@/components/reuseable/Button";


const ProfilePage = () => {
  // Accessing the user data from Redux store
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] md:h-[90vh] bg-[var(--background)] p-5">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="flex flex-col items-center mb-4">
            <div className="animate-pulse w-32 h-32 rounded-full border-2 border-red-200 mb-4 bg-gradient-to-r from-red-200 to-red-100"></div>
            <div className="bg-gradient-to-r from-red-200 to-red-100 rounded h-6 w-40 mb-2"></div>
            <div className="bg-gradient-to-r from-red-200 to-red-100 rounded h-4 w-60"></div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-red-800 animate-pulse bg-gradient-to-r from-red-200 to-red-100 rounded h-6 w-40"></h2>
            <div className="bg-gradient-to-r from-red-200 to-red-100 rounded h-4 w-60"></div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-red-800 animate-pulse bg-gradient-to-r from-red-200 to-red-100 rounded h-6 w-40"></h2>
            <div className="bg-gradient-to-r from-red-200 to-red-200 rounded h-4 w-60"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        User data not found. Please log in again.
      </div>
    );
  }

  return (
    <>
    {/* Structured Data */}
    <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: user.name,
          email: user.email,
          description: user.description || "No description provided",
          image: user.profilePic || "",
          jobTitle: "Customer at Guddu Catering Service",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Delhi, India",
          },
          knowsAbout: ["Catering Services", "Event Management","Manage Food"],
        })}
      </script>

    <div className="flex flex-col items-center justify-center h-[90vh] bg-gray-100 p-5">
      <div className="bg-[var(--background)] shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          {user.profilePic ? (
            <Image
              width={500}
              height={500}
              src={user.profilePic}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="text-gray-700">{user.description || "No description provided"}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Verification Status</h2>
          <p className={`text-gray-700 ${user.isVerified ? "text-green-500" : "text-red-500"}`}>
            {user.isVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>
    </div>
    <div className="mx-8">
    <Button label="Back to home" href="/" className="catr-btn" />
  </div>
    </>
    
  );
};

export default ProfilePage;
