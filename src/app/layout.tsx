import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Guddu Caterer - Best Catering Service in Delhi",
  description:
    "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
  twitter: {
    site: "@gudducaterer",
    creator: "@gudducaterer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const title =
    typeof metadata.title === "string" ? metadata.title : "Guddu Caterer - Best Catering Service in Delhi";

  const description = metadata.description || "Best wedding catering service in Delhi.";

  return (
    <html lang="en">
      <body>
        <Head>
          <meta name="description" content={description} />
          <meta name="title" content={title} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:card" content="summary_large_image" /> {/* Use a default value */}
          {metadata.twitter?.site && <meta name="twitter:site" content={metadata.twitter.site} />}
          {metadata.twitter?.creator && <meta name="twitter:creator" content={metadata.twitter.creator} />}
        </Head>

        <ClientProvider>{children}</ClientProvider>
        <footer>
          <Footer />
          <Copyright />
        </footer>
      </body>
    </html>
  );
}