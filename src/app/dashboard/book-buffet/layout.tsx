"use client";

import Head from "next/head";

export default function BookBuffetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default SEO-friendly metadata
  const defaultTitle = "Customize Your Buffet | Guddu Catering Service";
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
    <div>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      {children}
    </div>
  );
}