"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import apiHelper from "../../../utils/apiHelper";
import AuthLayout from "../../../components/layout/AuthLayout";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter(); // Hook for navigation

  const [status, setStatus] = useState({
    loading: true,
    message: "",
    success: false,
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setStatus({
          loading: false,
          message: "Invalid or missing token.",
          success: false,
        });
        return;
      }

      try {
        const data = await apiHelper("/api/user/verifyemail", {
          method: "POST",
          body: { token },
        });

        setStatus({
          loading: false,
          message: data.message,
          success: true,
        });
      } catch (error) {
        setStatus({
          loading: false,
          message: error instanceof Error ? error.message : "An error occurred",
          success: false,
        });
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="p-6 shadow-md rounded-md text-center">
      {status.loading ? (
        <p className="text-[var(--text-primary)]">Loading...</p>
      ) : status.success ? (
        <>
          <p className="text-[var(--success)] mb-4">{status.message}</p>
          <button
            className="px-4 py-2 bg-[var(--button)] text-[var(--text-white)] rounded hover:bg-[var(--button-hover)]"
            onClick={() => router.push("/auth/login")}
          >
            Go to Login Page
          </button>
        </>
      ) : (
        <p className="text-[var(--text-red)]">{status.message}</p>
      )}
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center bg-[var(--background)]">
        <Suspense fallback={<p>Loading...</p>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
