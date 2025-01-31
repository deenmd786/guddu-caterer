import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";
import { homePageSchema, localBusinessSchema, organizationSchema } from "@/schemas/homePageSchema";

// Add viewport export (Next.js 13+)
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Guddu Caterer - Best Catering Service in Delhi",
  description: "Welcome to Guddu Caterer, the best wedding catering service in Delhi.",
  keywords: "wedding catering in delhi, best caterer in delhi, corporate event catering, party catering services",  authors: [{ name: "Guddu Caterer", url: "https://www.gudducaterer.in" }],
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
    title: "Guddu Caterer - Best Catering Service in Delhi",
    description: "Professional catering services for weddings and events.",
    images: [
      "https://www.gudducaterer.in/logo.png",
      "https://www.gudducaterer.in/assets/images/banners/guddu.png",
      "https://www.gudducaterer.in/assets/images/banners/story.png",
    ],
    type: "website",
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