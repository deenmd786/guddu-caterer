import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Top-Quality Catering in Delhi – Starting at Just ₹200 Per Plate!",
  description: "Top-rated catering service in Delhi! We serve 20-2000+ guests, starting at just ₹200 per plate. Perfect for weddings, corporate events & parties. Book hassle-free catering today!",
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
        
      </body>
    </html>
  );
}