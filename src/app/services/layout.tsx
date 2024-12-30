
import WhyChooseUs from "../../components/admin-com/WhyChooseUs";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <main>
        <section>
          {children}
        </section>
        <section>
          <WhyChooseUs />
        </section>
      </main>
    </>
    );
  }
  