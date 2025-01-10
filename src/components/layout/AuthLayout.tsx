"use client";

import Logo from "../reuseable/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex px-4 h-screen w-screen flex-col gap-4 items-center py-8 md:py-0 md:justify-center bg-[var(--background-secondary)]"
      role="main"
      aria-label="Authentication Layout"
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center" aria-label="App Logo">
        <Logo />
      </div>

      {/* Auth Content */}
      <main className="w-full max-w-md" role="form" aria-labelledby="auth-section">
        <div id="auth-section" className="sr-only text-xl font-bold text-center text-[var(--button)] mb-6">
          Authentication Section
        </div>
        {children}
      </main>
    </div>
  );
}
