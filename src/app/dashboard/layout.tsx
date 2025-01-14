import AdminPanelData from "../../components/admin-com/AdminPanelData";
import Link from "next/link";
import DashboardNav from "../../components/admin-com/DashboardNav";
import Seo from "@/components/reuseable/Seo";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Seo
        title="Dashboard - Guddu Catering Services"
        description="Manage your catering bookings, menus, and more through the Guddu Catering Services dashboard."
        url="https://gudducaterer.in/dashboard"
        image="https://gudducaterer.in/dashboard-image.png"
        keywords="Dashboard, Guddu Catering Management"
      />
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
