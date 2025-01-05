"use client";

import Head from "next/head";
import WhyChooseUs from "../../components/admin-com/WhyChooseUs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Our Services | Guddu Catering Service</title>
        <meta
          name="description"
          content="Explore the exceptional catering services offered by Guddu Catering Services. From weddings to corporate events, we provide delicious food and professional service."
        />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Our Services - Guddu Catering Service",
              description: "Explore the exceptional catering services offered by Guddu Catering Services. From weddings to corporate events, we provide delicious food and professional service.",
              url: "https://www.gudducaterer.in/services",
            }),
          }}
        />
      </Head>
      <main>
        <section>
          {children}
        </section>
        <section>
          <WhyChooseUs />
        </section>
      </main>
    </>
  );
}