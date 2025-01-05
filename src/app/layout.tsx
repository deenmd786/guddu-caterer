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
          Discover the Best Catering Services in Delhi with Guddu Catering
        </title>
        <meta
          name="description"
          content="Guddu Catering offers exceptional catering services in Delhi, perfect for weddings, parties, and corporate events. Experience delicious food and impeccable service."
        />
        <meta name="robots" content="index, follow" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />

        {/* Google Search Console verification meta tag */}
        <meta name="google-site-verification" content="c3a84e8c0d7a5137" />
        {/* Add other meta tags as needed */}
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
