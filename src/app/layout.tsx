import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";
import { Toaster } from "react-hot-toast";


export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Best Caterers in Delhi - Guddu Caterers",
  description:
    "Guddu Caterers – Best Catering Service in Delhi for weddings, parties, and events. We serve delicious food, customized menus, and top-quality service to make your occasion unforgettable.",
  keywords:
    "wedding catering in Delhi, best caterers in Delhi, affordable catering services Delhi, corporate event catering Delhi, party catering services Delhi, top catering companies in Delhi, Guddu Catering Service",
  authors: [{ name: "Guddu Caterer", url: "https://www.gudducaterer.in" }],
  robots: "index, follow",
  alternates: { canonical: "https://www.gudducaterer.in/" },
  twitter: {
    site: "@gudducaterer",
    creator: "@gudducaterer",
    card: "summary_large_image",
    images: "https://www.gudducaterer.in/logo.png",
  },
  openGraph: {
    siteName: "Guddu Caterer",
    title:
      "Guddu Catering Service - Affordable & Best Catering Services in Delhi for Weddings & Events",
    description: "Professional catering services for weddings and events.",
    images: [
      {
        url: "https://www.gudducaterer.in/assets/images/banners/guddu.png",
        width: 1200,
        height: 630,
        alt: "Guddu Catering Service",
      },
    ],
    type: "website",
    locale: "en_IN",
    url: "https://www.gudducaterer.in/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ WebSite Schema for Google */}
        <meta name="google-adsense-account" content="ca-pub-6227091069689473"></meta>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Guddu Caterer",
      "image": "https://www.gudducaterer.in/assets/images/banners/guddu.png",
      "url": "https://www.gudducaterer.in/",
      "telephone": "+918750838486",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+918750838486",
        "contactType": "Customer Service"
      }
    }),
  }}
/>


        {/* ✅ Site Navigation Schema for Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": ["Home", "About Us", "Services", "Contact Us", "Login", "Signup"],
              "url": [
                "https://www.gudducaterer.in/",
                "https://www.gudducaterer.in/about-us",
                "https://www.gudducaterer.in/services",
                "https://www.gudducaterer.in/contact-us",
                "https://www.gudducaterer.in/auth/login",
                "https://www.gudducaterer.in/auth/signup",
              ],
            }),
          }}
        />
        
      </head>
      <body>
        <ClientProvider>{children}</ClientProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <footer>
          <Footer />
          <Copyright />
        </footer>
      </body>
    </html>
  );
}
