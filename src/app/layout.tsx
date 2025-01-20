"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

type RootLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  image: string;
  url: string;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Guddu Caterer | Home</title>
        <meta name="description" content="Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions." />
        <meta property="og:title" content="Guddu Caterer | Home" />
        <meta property="og:description" content="Welcome to Guddu Caterer, the best wedding catering service in Delhi." />
        <meta property="og:image" content="https://www.gudducaterer.in/logo.png" />
        <meta property="og:url" content="https://www.gudducaterer.in/" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}