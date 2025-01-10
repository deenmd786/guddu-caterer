"use client";

export default function BookBuffetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default SEO-friendly metadata
  const defaultDescription = "Explore and customize your buffet menu for events with Guddu Catering Service. Enjoy a seamless booking experience in Delhi.";

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Book Your Buffet",
    description: defaultDescription,
    url: "https://www.gudducaterer.in/dashboard/book-buffet",
    mainEntity: {
      "@type": "Service",
      serviceType: "Catering Service",
      provider: {
        "@type": "Organization",
        name: "Guddu Catering",
        url: "https://www.gudducaterer.in",
      },
    },
  };

  return (
       <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="max-h-[91vh] md:max-h-screen overflow-hidden">
        {children}
    </div>
       </>
  );
}