import type { Metadata } from "next";
import AdminPanelData from "../../components/admin-com/AdminPanelData";
import Link from "next/link";
import DashboardNav from "../../components/admin-com/DashboardNav";

export const metadata: Metadata = {
  title: "Guddu Catering: Book Delicious Custom Menu for Events in Delhi",
  description:
    "Elevate your events with Guddu Catering Service in Delhi. Customize your menu, book effortlessly, and enjoy premium service at affordable prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Guddu Catering Service's Dashboard",
          description:
            "Manage your Guddu Catering Service dashboard with ease. Access all features, track orders, and customize event menus from a single platform.",
          about: "Catering Services and Event Management in Delhi",
          publisher: {
            "@type": "Organization",
            name: "Guddu Catering Service",
            url: "https://gudducatering.com",
          },
          mainEntity: {
            "@type": "WebPageElement",
            name: "Dashboard",
          },
        })}
      </script>
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Admin panel sidebar */}
      <aside className="w-full md:w-1/4  md:h-[100vh] bg-[var(--background-secondary)] max-md:flex justify-between items-center custom-shadow">
        <div className=" md:bg-[var(--background-secondary)] h-[9vh] md:h-[25vh] shrink-0 shadow-[4px 0 10px rgba(0,0,0,0.2)]">
          <div className="max-md:flex max-md:w-screen max-md:p-2 justify-between  items-center">
            <Link href={"/dashboard"}>
              <AdminPanelData />
            </Link>
            <div className="">
              <DashboardNav />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="w-full md:w-3/4 bg-[var(--background)] ">
        <div className="min-h-[91vh] md:min-h-screen w-full rounded-lg">{children}</div>
        
      </main>
    </div>
    </>
  );
}
