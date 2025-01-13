import { DefaultSeoProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  title: "Guddu Catering Service in Delhi",
  description:
    "Guddu Catering offers exceptional catering services in Delhi, perfect for weddings, parties, and corporate events. Experience delicious food and impeccable service.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.gudducaterer.in",
    siteName: "Guddu Catering",
    images: [
      {
        url: "https://www.gudducaterer.in/guddu-catering-service.jpg",
        width: 1200,
        height: 630,
        alt: "Guddu Catering Service",
      },
    ],
  },
  twitter: {
    handle: "@gudducaterer",
    site: "@gudducaterer",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
