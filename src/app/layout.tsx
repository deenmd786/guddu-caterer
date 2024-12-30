"use client"
import "./globals.css";
import Copyright from "../components/layout/CopyRight";
import Footer from "../components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
          {children}
          </Provider>
        <Footer />
        <Copyright />
      </body>
    </html>
  );
}
