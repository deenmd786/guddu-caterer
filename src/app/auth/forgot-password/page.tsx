"use client";

import React, { useState } from "react";
import apiHelper from "../../../utils/apiHelper";
import Link from "next/link";
import AuthLayout from "../../../components/layout/AuthLayout";

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await apiHelper("/api/user/forgot-password", {
        method: "POST",
        body: formData,
      });

      setSuccess(data.message || "Password reset link sent successfully!");
      setFormData({ email: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="container max-w-md mx-auto p-6 bg-[var(--background)] rounded-lg shadow-md">
        <h2 className="text-2xl text-[var(--text-primary)] font-semibold text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all placeholder-transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-2 transition-all origin-[0] scale-75 transform pointer-events-none ${
                formData.email || focus
                  ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10 bg-white"
                  : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg"
              }`}
            >
              Email
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
            {loading ? "Sending request..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-center text-[var(--text-muted)]">
          Remembered your password?{" "}
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
      </div>
    </AuthLayout>
     );
};

export default ForgotPassword;
