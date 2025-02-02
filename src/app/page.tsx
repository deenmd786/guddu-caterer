import dynamic from "next/dynamic";
import Head from "next/head";

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
      <Head>
        <title>Guddu Catering Service - Affordable & Best Catering Services in Delhi for Weddings & Events</title>
        <meta name="description" content="Welcome to Guddu Catering Service! We provide catering for 20 to 1000+ guests, perfect for weddings, corporate events, and parties in Delhi. Packages start at just ₹2499. Book now for delicious, hassle-free catering!" />
        <meta name="keywords" content="wedding catering in Delhi, best caterer in Delhi, affordable catering services Delhi, corporate event catering Delhi, party catering services Delhi" />
        <meta name="author" content="Guddu Caterer" />
        <link rel="canonical" href="https://www.gudducaterer.in" />
      </Head>
      <Header />
      <main role="main">
        <section
          id="home"
          className="text-[var(--background)] overflow-x-hidden"
          aria-label="Main banner section"
        >
          <CatBanner />
        </section>
        <section id="services" aria-labelledby="services-heading">
          <h2 id="services-heading" className="sr-only">Our Catering Services</h2>
          <OurServices />
        </section>
        <section id="story" className="px-4" aria-labelledby="story-heading">
          <h2 id="story-heading" className="sr-only">Our Story</h2>
          <LayoutWithImages />
        </section>
        <section id="why-choose-us" aria-labelledby="why-choose-us-heading">
          <h2 id="why-choose-us-heading" className="sr-only">Why Choose Us</h2>
          <WhyChooseUs />
        </section>
        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading" className="sr-only">About Us</h2>
          <AboutUs />
        </section>
        <section id="testimonials" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
          <OurTestimonials />
        </section>
      </main>
    </>
  );
}