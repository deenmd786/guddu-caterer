"use client";

import React, { useState, useEffect, Suspense } from "react";
import apiHelper from "../../../utils/apiHelper";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../../../components/layout/AuthLayout";

interface FormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ password: boolean; confirmPassword: boolean }>({
    password: false,
    confirmPassword: false,
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!token || !userId) {
      router.push("/auth/login");
    }
  }, [token, userId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFocus = (field: "password" | "confirmPassword") => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field: "password" | "confirmPassword") => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const newPassword = formData.password;
      const data = await apiHelper("/api/user/reset-password", {
        method: "POST",
        body: { token, userId, newPassword },
      });

      setSuccess(data.message || "Password reset successful!");
      setFormData({ password: "", confirmPassword: "" });
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reset Password - Guddu Catering Service",
    description: "Reset your password for your Guddu Catering Service's account. Enter your new password to regain access.",
    url: "https://www.gudducaterer.in/auth/reset-password",
  };


  return (
    <AuthLayout>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container max-w-md mx-auto p-6 bg-[var(--background)] rounded-lg shadow-md">
        <h2 className="text-2xl text-[var(--text-primary)] font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["password", "confirmPassword"].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "password" ? (passwordVisible ? "text" : "password") : (confirmPasswordVisible ? "text" : "password")}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all placeholder-transparent"
                onFocus={() => handleFocus(field as "password" | "confirmPassword")}
                onBlur={() => handleBlur(field as "password" | "confirmPassword")}
              />
              <label
                htmlFor={field}
                className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                  formData[field as keyof FormData] || focus[field as keyof typeof focus]
                    ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-white"
                    : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
                }`}
              >
                {field === "password" ? "Password" : "Confirm Password"}
              </label>
              <button
                type="button"
                className="absolute right-4 top-3 text-[var(--button)]"
                onClick={() => togglePasswordVisibility(field as "password" | "confirmPassword")}
              >
                {field === "password" ? (passwordVisible ? <FaEyeSlash /> : <FaEye />) : (confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />)}
              </button>
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-[var(--button)] text-[var(--text-white)] hover:text-[var(--text-primary)] font-semibold rounded-md transition-colors ${
              loading ? "bg-[var(--button-hover)]" : "hover:bg-[var(--button-hover)]"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {error && <p className="text-[var(--text-red)] text-center mt-4">{error}</p>}
          {success && <p className="text-[var(--success)] text-center mt-4">{success}</p>}
        </form>
      </div>
    </AuthLayout>
  );
};


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}

