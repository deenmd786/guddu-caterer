"use client";

import "./globals.css";
import Copyright from "../components/layout/CopyRight";
import Footer from "../components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "../../next-seo.config";
import Head from "next/head";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <DefaultSeo {...defaultSEOConfig} />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
        <Footer />
        <Copyright />
      </body>
    </html>
  );
}