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
        <title>Your Site Title</title>
        <meta name="description" content="Your site description here." />
        <link rel="icon" href="/favicon.ico" />
        {/* Add other meta tags as needed */}
      </Head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
        <Footer />
        <Copyright />
        {/* If you want to use Speed Insights, you can add it here */}
        <SpeedInsights />
      </body>
    </html>
  );
}