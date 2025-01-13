"use client";

import "./globals.css";
import Copyright from "../components/layout/CopyRight";
import Footer from "../components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "../../next-seo.config";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        <DefaultSeo {...defaultSEOConfig} />
        <Provider store={store}>{children}</Provider>
        <Footer />
        <Copyright />
      </body>
    </html>
  );
}
