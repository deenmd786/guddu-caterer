"use client";

import { clearUser  } from "../../redux/userSlice";
import apiHelper from "../../utils/apiHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "../reuseable/Button";
import MobileNav from "./MobileNav";
import { useState } from "react";

const DashboardNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiHelper("/api/user/logout", {
        method: "GET",
      });
      dispatch(clearUser ());
      router.push("/"); // Redirect to home after logout
    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : "An error occurred during logout"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="md:bg-[var(--background-secondary)] text-[var(--text-primary)] md:p-3 lg:p-5 rounded-lg md:shadow-md w-full max-w-3xl mx-auto">
      <div className="p-2 lg:p-4 md:bg-[var(--background)]">
      <h2 className="max-md:hidden bg-[var(--background-secondary)] text-xl font-semibold text-[var(--text-secondary)]  mb-2 lg:mb-4 md:p-2 lg:p-5 rounded-lg shadow-md border-b-2 border-[var(--border)]">
        Dashboard Navigation
      </h2>

      {/* Mobile Navigation */}
      <MobileNav
        handleLogout={handleLogout}
        loading={loading}
      />

      {/* Desktop Links */}
      <div className="hidden md:flex  flex-col gap-3">
      <Link href="/dashboard/book-buffet/menu" className="transition duration-200 rounded-lg shadow-md p-2 md:p-4 bg-[var(--background-secondary)] hover:bg-[var(--button)] hover:text-white hover:shadow-lg">
          Book Your Buffet
        </Link>
        <Link href="/dashboard/profile" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] bg-[var(--background-secondary)] hover:text-white hover:shadow-lg">
          Your Profile
        </Link>
        
        <Link href="/dashboard/profile-settings" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] bg-[var(--background-secondary)] hover:text-white hover:shadow-lg">
          Profile Settings
        </Link>
        <Link href="/dashboard/orders" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] bg-[var(--background-secondary)] hover:text-white hover:shadow-lg">
          Your Orders
        </Link>
        <Link href="/contact-us" className="transition duration-200 rounded-lg shadow-md p-2 hover:bg-[var(--button)] bg-[var(--background-secondary)] hover:text-white hover:shadow-lg">
          Support
        </Link>

        <Button
          label={loading ? "Logging out..." : "Logout"}
          onClick={handleLogout}
          className={`bg-red-600 text-white hover:bg-red-700 transition duration-200 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        />
      </div>
      </div>
    </nav>
  );
};

export default DashboardNav;