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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Guddu Caterer | Best Catering Services in Delhi with Our Customise Menus.</title>
        <meta name="description" content="Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions." />
        <meta property="og:title" content="Guddu Caterer | Best Catering Services in Delhi with Our Customise Menus." />
        <meta property="og:description" content="Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions." />
        <meta property="og:image" content="https://www.gudducaterer.in/logo.png" />
        <meta property="og:url" content="https://www.gudducaterer.in/" />
        <meta property="og:type" content="website" />
      </head>
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );

}
