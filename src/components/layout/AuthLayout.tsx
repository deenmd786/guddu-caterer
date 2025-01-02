"use client";

import Logo from "../reuseable/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex px-4 h-screen w-screen flex-col gap-4 items-center py-8 md:py-0 md:justify-center bg-[var(--background-secondary)]">
        <div><Logo/></div>
        {children}
    </div>
  );
}
