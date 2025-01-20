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
  title,
  description,
  image,
  url,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}