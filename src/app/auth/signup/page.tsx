"use client";

import React, { useState } from "react";
import apiHelper from "../../../utils/apiHelper";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import convertToBase64 from "../../../helpers/bash64Img";
import { FaUser  } from "react-icons/fa6";
import AuthLayout from "../../../components/layout/AuthLayout";
import { FormData } from "../../../types/FormData";



const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    description: "",
    password: "",
    profilePic: null,
    role: "GENERAL",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
    description: false
  });


  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  // Handle focus state
  const handleFocus = (field: keyof typeof focus) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focus) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setFormData((prevData) => ({
          ...prevData,
          profilePic: base64Image as string,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Form Data: ", formData);
      
       await apiHelper("/api/user/signup", {
        method: "POST",
        body: formData,
      });

      setSuccess("We have sent you a verification link! Please check your email.");
      setFormData({
        name: "",
        email: "",
        description: "",
        password: "",
        profilePic: null,
        role: "GENERAL",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="container max-w-md mx-auto px-6 py-4 bg-[var(--background)] rounded-lg shadow-md">
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="border-2 border-gray-950 rounded-full w-24 h-24 flex items-center justify-center relative overflow-hidden">
            {formData.profilePic ? (
              <Image
                src={formData.profilePic}
                alt="Profile"
                layout="fill" // Ensures the image takes up the full container
                objectFit="cover" // Maintains aspect ratio and fills the container
              />
            ) : (
              <FaUser  className="text-5xl text-gray-700" />
            )}
            <label className="absolute bottom-0 left-0 w-full text-center text-sm text-[var(--text-primary)] font-bold bg-slate-300 py-1 opacity-70 cursor-pointer">
              Upload
              <input
                type="file"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </div>
          <h2 className="text-2xl text-[var(--text-primary)] font-semibold mb-2">
            Sign Up
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "description"].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "description" ? "text" : "text"}
                name={field}
                value={formData[field as keyof FormData] || ""}
                onChange={handleChange}
                required
                placeholder=""
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all placeholder-transparent"
                onFocus={() => handleFocus(field as keyof typeof focus)}
                onBlur={() => handleBlur(field as keyof typeof focus)}
              />

              <label
                htmlFor={field}
                className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                  formData[field as keyof FormData] ||
                  focus[field as keyof typeof focus]
                    ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-[var(--background)]"
                    : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formData.password || ""} // Provide fallback value
              onChange={handleChange}
              required
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all placeholder-transparent"
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
            />

            <label
              htmlFor="password"
              className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                formData.password || focus.password
                  ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-[var(--background)]"
                  : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none"
            >
              {isPasswordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-[var(--button)] text-[var(--text-white)] hover:text-[var(--text-primary)] font-semibold rounded-md transition-colors ${
              loading
                ? "bg-[var(--button-hover)]"
                : "hover:bg-[var(--button-hover)]"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <p className="mt-4 text-center text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--button)] hover:underline"
            >
              Login
            </Link>
          </p>

          {error && (
            <p className="text-[var(--text-red)] text-center mt-4">{error}</p>
          )}
          {success && (
            <p className="text-[var(--success)] text-center mt-4">{success}</p>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;