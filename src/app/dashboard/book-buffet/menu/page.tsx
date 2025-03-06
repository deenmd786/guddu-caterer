import type { Metadata } from "next";
import Menus from "../../_components/Menus";

export const metadata: Metadata = {
  title: "Menus - Buffet Booking",
  description: "Browse through our delicious menus and book your buffet today!",
  keywords: ["buffet", "menu", "booking", "food"],
  authors: [{ name: "Guddu Catering Services" }], // Use `authors` instead of `author`
  openGraph: {
    title: "Menus - Buffet Booking",
    description: "Browse through our delicious menus and book your buffet today!",
    type: "website",
    url: "https://gudducaterer.in/dashboard/menus",
    images: [
      {
        url: "https://gudducaterer.in/images/banners/guddu.png",
        width: 800,
        height: 600,
        alt: "Buffet Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gudducaterer", // Update with your actual Twitter handle
    title: "Menus - Buffet Booking",
    description: "Browse through our delicious menus and book your buffet today!",
    images: "https://gudducaterer.in/images/banners/guddu.png",
  },
  other: {
    "google-site-verification": "NlhLoHQ5Ja_1werW0Sq1OVmvo0Icpou4b2SHCr6pAa8",
  },
};

export default function MenusPage() {
  return <Menus />;
}