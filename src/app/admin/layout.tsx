"use client";
import AdminPanelData from "@/components/admin-com/AdminPanelData";
import AdminPanelNavigation from "@/components/admin-com/AdminPanelNavigation";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/"); // Redirect to home page or login page if not an admin
    }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") {
    return null; // Optionally, render a loader or nothing while redirecting
  }

  return (
    <div className="flex overflow-y-hidden">
      {/* Admin panel sidebar */}
      <aside className="min-w-[40%] min-h-screen md:min-w-[30%] sticky top-0 custom-shadow">
        <div className="shadow-black shadow-[4px 0 10px rgba(0,0,0,0.2)]">
          <AdminPanelData />
          <AdminPanelNavigation />
        </div>
      </aside>
      {/* Main content area */}
      <main className="bg-[var(--background)] flex-1">
        <Link
          href="/"
          className="h-[10vh] p-4 w-full block bg-[var(--background-secondary)] text-gray-900 text-xl font-medium text-right"
        >
          Back to home
        </Link>
        <div className="max-h-[90vh] overflow-y-scroll p-4">{children}</div>
      </main>
    </div>
  );
}
