import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Guddu Catering Service",
  description: "Get in touch with Guddu Catering for exceptional catering services in Delhi. Reach out via phone, chat, or book an appointment to discuss your catering needs.",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
    </>
  );
}