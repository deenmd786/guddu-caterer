"use client";

import UpdateUser from "@/components/admin-com/UpdateUser";
import Button from "@/components/reuseable/Button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const metadata = {
  title: "Profile Settings | Update Your Account at Guddu Catering",
  description:
    "Easily manage and update your account details, including personal information, preferences, and more. Enjoy seamless updates with Guddu Catering's Profile Settings.",
};

const ProfileSettings = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            No User Data Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t retrieve your account details. Please log in again to
            access your profile settings.
          </p>
          <Button label="Go to Login" href="/login" className="catr-btn" />
        </div>
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
          description:
            user.description || "No description available for this user.",
          image: user.profilePic || "",
          jobTitle: "Customer at Guddu Catering Service",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Delhi, India",
          },
          knowsAbout: ["Catering Services", "Event Management"],
        })}
      </script>

      {/* Profile Settings */}
      <div className="flex flex-col justify-center items-center h-[70vh] md:h-[90vh]">
        <UpdateUser user={user} />
      </div>
      <div className="mx-8">
        <Button label="Back to Home" href="/" className="catr-btn" />
      </div>
    </>
  );
};

export default ProfileSettings;
