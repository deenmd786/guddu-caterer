import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";
import Head from "next/head";

// Define the metadata structure correctly
export const metadata: Metadata = {
  title: "Guddu Caterer - Best Catering Service in Delhi", // Title is a string
  description:
    "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
  twitter: {
    card: "summary_large_image", // Correctly define the twitter card
    site: "@gudducaterer", // Optional: Twitter handle for the site
    creator: "@gudducaterer", // Optional: Creator's Twitter handle
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Ensure title is set properly, checking for a string
  const title =
    typeof metadata.title === "string" ? metadata.title : "Guddu Caterer - Best Catering Service in Delhi";

  // Set description, ensuring it falls back if undefined
  const description = metadata.description || "Best wedding catering service in Delhi.";

  // Set twitter card, using a fallback
  const twitterCard = metadata.twitter?.card || "summary_large_image";

  return (
    <html lang="en">
      <body>
        {/* Include metadata in <head> for SEO */}
        <Head>
          <meta name="description" content={description} />
          <meta name="title" content={title} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:card" content={twitterCard} />
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
