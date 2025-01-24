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
  keywords: "wedding catering in delhi, catering service in delhi, best catering service in Delhi",
  twitter: {
    site: "@gudducaterer",
    creator: "@gudducaterer",
    card: "summary_large_image",
    images: "https://www.gudducaterer.in/logo.png",
  },
  openGraph: {
    siteName: "Guddu Caterer",
    title: "Guddu Caterer - Best Catering Service in Delhi",
    description:
      "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
    images: [
      "https://www.gudducaterer.in/logo.png",
      "/assets/images/banners/guddu.png",
      "/assets/images/banners/story.png",
    ],
    type: "website",
    url: "https://www.gudducaterer.in/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const title =
    typeof metadata.title === "string" ? metadata.title : "Guddu Caterer - Best Catering Service in Delhi";

  const description = metadata.description || "Best wedding catering service in Delhi.";

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        {metadata.twitter?.site && <meta name="twitter:site" content={metadata.twitter.site} />}
        {metadata.twitter?.creator && <meta name="twitter:creator" content={metadata.twitter.creator} />}
        <meta name="google-adsense-account" content="ca-pub-6227091069689473" />

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Home | Guddu Caterer",
              description:
                "Welcome to Guddu Caterer - The Best Catering Service Provider in Delhi for weddings, events, and special occasions.",
              url: "https://www.gudducaterer.in",
              publisher: {
                "@type": "Organization",
                name: "Guddu Caterer",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.gudducaterer.in/logo.png",
                },
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Guddu Caterer",
              url: "https://www.gudducaterer.in",
              logo: "https://www.gudducaterer.in/logo.png",
              sameAs: [
                "https://www.facebook.com/gudducaterer",
                "https://www.instagram.com/gudducaterer",
                "https://www.twitter.com/gudducaterer",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9278422664",
                contactType: "Customer Service",
                areaServed: "Delhi, India",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Guddu Caterer",
              description:
                "Professional Catering Services in Delhi for Weddings, Parties, and Corporate Events.",
              url: "https://www.gudducaterer.in",
              telephone: "+91-9278422964",
              address: {
                "@type": "PostalAddress",
                streetAddress: "A-1, Rajhans Vihar, Carnal Bhatia Road, Vikas Nagar",
                addressLocality: "New-Delhi",
                addressRegion: "Delhi",
                postalCode: "110059",
                addressCountry: "IN",
              },
              openingHours: "Mo-Su 09:00-22:00",
              priceRange: "Rs. 300 par Plate",
              image: "https://www.gudducaterer.in/logo.png",
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.613939",
                longitude: "77.209023",
              },
            }),
          }}
        />
      </Head>

      <body>
        <ClientProvider>{children}</ClientProvider>
        <footer>
          <Footer />
          <Copyright />
        </footer>
      </body>
    </html>
  );
}
