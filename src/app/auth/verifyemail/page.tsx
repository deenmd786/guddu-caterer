"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import apiHelper from "@/utils/apiHelper";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const VerifyUser = () => {
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
    <AuthLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Verify User - Guddu Catering Service",
            description: "Verify your account with Guddu Catering Service using the link sent to your email. Complete your registration process.",
            url: "https://www.gudducaterer.in/auth/verify-user",
          }),
        }}
      />

      <div className="flex items-center justify-center bg-[var(--background)]">
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
    </div>
    </AuthLayout>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyUser />
    </Suspense>
  );
}
