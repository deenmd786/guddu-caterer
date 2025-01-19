"use client";

import "./globals.css";
import Copyright from "../components/layout/CopyRight";
import Footer from "../components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from "next/head";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Guddu Caterer | Best Custom Wedding Catering Service in Delhi</title>
        <meta name="description" content="Exceptional catering services in Delhi." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://www.gudducaterer.in" />
        <meta property="og:site_name" content="Guddu Catering" />
        <meta property="og:title" content="Guddu Caterer | Best Catering Service in Delhi" />
        <meta property="og:description" content="Exceptional catering services in Delhi." />
        <meta property="og:image" content="https://www.gudducaterer.in/guddu-catering-service.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Guddu Catering" />
        <meta name="twitter:description" content="Exceptional catering services in Delhi." />
        <meta name="twitter:image" content="https://www.gudducaterer.in/guddu-catering-service.jpg" />
      </head> */}

<Head>
        <title>Guddu Caterer | Best Custom Wedding Catering Service in Delhi</title>
        <meta name="description" content="Exceptional catering services in Delhi." />
      </Head>
      <body>
        {/* Provider ensures Redux state is available globally */}
        <Provider store={store}>
          {children}
        </Provider>
        <Footer />
        <Copyright />
      </body>
    </html>
  );
}
