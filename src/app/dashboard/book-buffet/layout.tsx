"use client";

export default function BookBuffetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
       <>
        <div className="max-h-[91vh] md:max-h-screen overflow-hidden">
        {children}
    </div>
       </>
  );
}