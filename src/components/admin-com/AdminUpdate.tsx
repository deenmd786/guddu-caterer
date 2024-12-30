"use client";

import React, { useState, useEffect } from "react";
import apiHelper from "../../utils/apiHelper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import convertToBase64 from "../../helpers/bash64Img";
import { User } from "../../types/User";
import UserRole from "@/common/UserRole"; // Import UserRole
import { FaTimes } from "react-icons/fa";

interface UserUpdateProps {
  user: User;
  onClose: () => void;
}

const AdminUpdate: React.FC<UserUpdateProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState<User>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    role: false,
    profilePic: false,
    description: false,
  });

  const router = useRouter();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (field: keyof typeof focus) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focus) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePic: base64Image as string,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Submitting email...");

    try {
      console.log("formData", formData);

      const response = await apiHelper(`/api/user/update-admin`, {
        method: "PUT",
        body: formData,
      });

      // Check if the response has an error
      if (!response.success) {
        throw new Error(
          response.message || "An error occurred while updating user data."
        );
      }
      setSuccess(response.message || "User  updated successfully!");
      setTimeout(() => router.push("/dashboard/profile"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed  inset-0 bg-[var(--background-secondary)] z-30 overflow-hidden opacity-100">
      <div className=" h-[80vh] relative mt-10  max-w-md mx-auto px-6 py-4 bg-[var(--background)] rounded-lg shadow-md">
        <span onClick={onClose} className="absolute top-3 right-3 p-3 text-2xl cursor-pointer"><FaTimes />
        </span>
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="border-2 border-gray-950 rounded-full w-24 h-24 flex items-center justify-center relative overflow-hidden">
            {formData.profilePic ? (
              <Image
                src={formData.profilePic}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <FaUser className="text-5xl text-gray-700" />
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
            Update User
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "description"].map((field) => (
            <div key={field} className="relative">
              <input
                type="text"
                name={field}
                value={formData[field as keyof User] as string}
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
                  formData[field as keyof User] ||
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all"
              onFocus={() => handleFocus("role")}
              onBlur={() => handleBlur("role")}
            >
              <option value="" disabled>
                Select Role
              </option>
              {Object.entries(UserRole).map(([key, value]) => (
                <option key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <label
              htmlFor="role"
              className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                formData.role || focus.role
                  ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-[var(--background)]"
                  : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
              }`}
            >
              Role
            </label>
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
            {loading ? "Updating..." : "Update User"}
          </button>
          {error && (
            <p className="text-[var(--danger)] text-center mt-4">{error}</p>
          )}
          {success && (
            <p className="text-[var(--success)] text-center mt-4">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
