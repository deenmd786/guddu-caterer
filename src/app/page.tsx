import dynamic from "next/dynamic";

const CatBanner = dynamic(() => import("../components/layout/CatBanner"), {
  ssr: true,
  loading: () => <div className="h-screen bg-gray-200 animate-pulse" />,
});
const OurServices = dynamic(() => import("../components/layout/OurServices"));
const LayoutWithImages = dynamic(
  () => import("../components/layout/StoryLayout")
);
const WhyChooseUs = dynamic(() => import("../components/layout/WhyChooseUs"));
const AboutUs = dynamic(() => import("../components/layout/AboutUs"));
const OurTestimonials = dynamic(
  () => import("../components/layout/OurTestimonials")
);
const Header = dynamic(() => import("../components/ui/Header"));

export default function Home() {
  return (
    <>
      <Header />
      <main role="main">
        <section
          id="home"
          className="text-[var(--background)] overflow-x-hidden"
          aria-label="Main banner section"
        >
          <CatBanner />
        </section>
        <section id="services">
          <OurServices />
        </section>
        <section id="story" className="px-4">
          <LayoutWithImages />
        </section>
        <section id="why-choose-us">
          <WhyChooseUs />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="testimonials">
          <OurTestimonials />
        </section>
        
      </main>
    </>
  );
}
