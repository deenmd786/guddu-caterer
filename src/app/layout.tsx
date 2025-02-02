import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";
import { homePageSchema, localBusinessSchema, organizationSchema } from "@/schemas/homePageSchema";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Guddu Caterer - Affordable & Best Catering Services in Delhi for Weddings & Events",
  description: "Welcome to Guddu Catering Service! We provide catering for 20 to 1000+ guests, perfect for weddings, corporate events, and parties in Delhi. Packages start at just ₹2499. Book now for delicious, hassle-free catering!",
  keywords: "wedding catering in Delhi, best caterer in Delhi, affordable catering services Delhi, corporate event catering Delhi, party catering services Delhi, top catering companies in Delhi, Guddu Catering Service",  authors: [{ name: "Guddu Caterer", url: "https://www.gudducaterer.in" }],
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
    title: "Guddu Catering Service - Affordable & Best Catering Services in Delhi for Weddings & Events",
    description: "Professional catering services for weddings and events.",
    images: [
      {
        url: "https://www.gudducaterer.in/assets/images/banners/guddu.png", 
        width: 1200,
        height: 630,
        alt: "Guddu Catering Service"
      }
    ],
    type: "website",
    locale: "en_IN",
    url: "https://www.gudducaterer.in/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
        <footer>
          <Footer />
          <Copyright />
        </footer>

        {/* Schema Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}