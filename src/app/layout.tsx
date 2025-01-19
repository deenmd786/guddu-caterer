"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from "next/head";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );

}
