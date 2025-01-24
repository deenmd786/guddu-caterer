import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";

export const metadata = {
  title: "Guddu Caterer - Best Catering Service in Delhi",
  description: "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
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
    description: "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
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
  const title = metadata.title || "Guddu Caterer - Best Catering Service in Delhi";
  const description = metadata.description || "Best wedding catering service in Delhi.";

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="title" content={title} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        {metadata.openGraph.images.map((img, index) => (
          <meta property="og:image" content={img} key={index} />
        ))}
        <meta name="twitter:card" content={metadata.twitter.card} />
        {metadata.twitter.site && <meta name="twitter:site" content={metadata.twitter.site} />}
        {metadata.twitter.creator && <meta name="twitter:creator" content={metadata.twitter.creator} />}
        <link rel="canonical" href={metadata.openGraph.url} />
        <meta name="google-adsense-account" content="ca-pub-6227091069689473"></meta>
      </head>
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
