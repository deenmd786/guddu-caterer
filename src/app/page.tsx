
import dynamic from "next/dynamic";

const CatBanner = dynamic(() => import("../components/layout/CatBanner"));
const OurServices = dynamic(() => import("../components/layout/OurServices"));
const LayoutWithImages = dynamic(() => import("../components/layout/StoryLayout"));
const WhyChooseUs = dynamic(() => import("../components/layout/WhyChooseUs"));
const AboutUs = dynamic(() => import("../components/layout/AboutUs"));
const OurTestimonials = dynamic(() => import("../components/layout/OurTestimonials"));
const Header = dynamic(() => import("../components/ui/Header"));

export default function Home() {

  return (
    <>
      <Header />
      <main>
        <section id="home" className="text-[var(--background)] overflow-x-hidden">
          <CatBanner />
        </section>

        <section id="services">
          <OurServices />
        </section>

        <section id="story" className="px-4">
          <LayoutWithImages />
        </section>

        <section>
          <WhyChooseUs />
        </section>

        <section id="about">
          <AboutUs />
        </section>

        <section>
          <OurTestimonials />
        </section>
      </main>
    </>
  );
}
