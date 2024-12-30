"use client";

import React, { useState } from "react";
import apiHelper from "../../../utils/apiHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../../../components/layout/AuthLayout";
import { setUser } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFocus = (field: keyof FormData) => {  // Changed field to keyof FormData
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field: keyof FormData) => {  // Changed field to keyof FormData
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await apiHelper("/api/user/login", {
        method: "POST",
        body: formData,
      });
      console.log("data: " ,data);
      
      dispatch(setUser (data.user));
      setSuccess(data.message || "Login successful!");
      setFormData({ email: "", password: "" });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      router.push("/auth/signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="container max-w-md mx-auto p-6 bg-[var(--background)] rounded-lg shadow-md">
        <h2 className="text-2xl text-[var(--text-primary)] font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof FormData]} // Explicitly type the access
                onChange={handleChange}
                required
                placeholder=""
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all placeholder-transparent"
                onFocus={() => handleFocus(field as keyof FormData)} // Explicit cast to keyof FormData
                onBlur={() => handleBlur(field as keyof FormData)} // Explicit cast to keyof FormData
              />
              <label
                htmlFor={field}
                className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                  formData[field as keyof FormData] || focus[field as keyof typeof focus]
                    ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-[var(--background)]"
                    : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <p className="text-right text-sm mb-4">
            <Link href="/auth/forgot-password" className="text-[var(--button)] hover:underline">
              Forgot Password?
            </Link>
          </p>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-[var(--button)] text-[var(--text-white)] hover:text-[var(--text-primary)] font-semibold rounded-md transition-colors ${
              loading ? "bg-[var(--button-hover)]" : "hover:bg-[var(--button-hover)]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[var(--button)] hover:underline">
            Sign up
          </Link>
        </p>
        {error && <p className="text-[var(--text-red)] text-center mt-4">{error}</p>}
        {success && <p className="text-[var(--success)] text-center mt-4">{success}</p>}
      </div>
    </AuthLayout>
  );
};

export default Login;
