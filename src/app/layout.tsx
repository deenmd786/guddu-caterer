import ClientProvider from "@/redux/ClientProvider";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Copyright from "@/components/layout/CopyRight";

export const metadata: Metadata = {
  title: {
    default: "Guddu Caterer - Best Catering Service in Delhi",
    template: "%s | Guddu Caterers - Best Catering Service in Delhi",
  },
  description:
    "Welcome to Guddu Caterer, the best wedding catering service in Delhi. Customized buffets and exceptional live cooking for all occasions.",
  twitter: {
    card: "summary_large_image",
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
      </body>
    </html>
  );
}
