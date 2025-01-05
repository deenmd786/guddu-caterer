"use client";

import "./globals.css";
import Copyright from "../components/layout/CopyRight";
import Footer from "../components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>
          Book Delicious Food for Any Occasion | Guddu Catering Service in Delhi
        </title>
        <meta
          name="description"
          content="Guddu Catering offers exceptional catering services in Delhi, perfect for weddings, parties, and corporate events. Experience delicious food and impeccable service."
        />
        <meta
          name="keywords"
          content="catering services, wedding catering, party catering, corporate event catering, Guddu Catering, Delhi catering, live cooking, buffet catering, wedding food, party food, corporate event food, best catering in Delhi"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Tags for social sharing */}
        <meta
          property="og:title"
          content="Book Delicious Food for Any Occasion | Guddu Catering Service in Delhi"
        />
        <meta
          property="og:description"
          content="Guddu Catering offers exceptional catering services in Delhi, perfect for weddings, parties, and corporate events. Experience delicious food and impeccable service."
        />
        <meta property="og:image" content="https://www.gudducaterer.in/logo.png" />
        <meta property="og:url" content="https://www.gudducaterer.in" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Book Delicious Food for Any Occasion | Guddu Catering Service in Delhi"
        />
        <meta
          name="twitter:description"
          content="Guddu Catering offers exceptional catering services in Delhi, perfect for weddings, parties, and corporate events. Experience delicious food and impeccable service."
        />
        <meta name="twitter:image" content="https://www.gudducaterer.in/logo.png" />

        {/* Schema Markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Guddu Catering",
              url: "https://www.gudducaterer.in",
              logo: "https://www.gudducaterer.in/logo.png",
              description:
                "Guddu Catering Service delivers exceptional services with live cooking, customized buffets, and delicious flavors. From weddings to corporate events, we make every event memorable.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "6/B-3, Bheem Enclave",
                addressLocality: "South-West Delhi",
                addressRegion: "Delhi",
                postalCode: "110059",
                addressCountry: "IN",
              },
              telephone: "+91-9278422964", // Update with actual contact number
            }),
          }}
        />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
        <Footer />
        <Copyright />
        {/* Optional: Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
