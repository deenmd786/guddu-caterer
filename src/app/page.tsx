"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import { setUser } from "../redux/userSlice";
import { User } from "../types/User";
import apiHelper from "../utils/apiHelper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ApiResponse {
  message?: string;
  user?: User;
}

const CatBanner = dynamic(() => import("../components/layout/CatBanner"));
const OurServices = dynamic(() => import("../components/layout/OurServices"));
const LayoutWithImages = dynamic(() => import("../components/layout/StoryLayout"));
const WhyChooseUs = dynamic(() => import("../components/layout/WhyChooseUs"));
const AboutUs = dynamic(() => import("../components/layout/AboutUs"));
const OurTestimonials = dynamic(() => import("../components/layout/OurTestimonials"));
const Header = dynamic(() => import("../components/ui/Header"));

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data: ApiResponse = await apiHelper("/api/user/me", { method: "GET" });
        if (data?.user) {
          dispatch(setUser(data.user));
          setError(null);
        } else {
          throw new Error(data.message || "User data not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message text-red-500">{error}</div>;
  }

  return (
    <>
      <Head>
  <title>Home | Guddu Caterer</title>
  <meta
    name="description"
    content="Welcome to Guddu Caterer - The Best Catering Service Provider in Delhi for weddings, events, and special occasions."
  />
  <meta name="keywords" content="Catering Services, Wedding Caterer, Event Caterer, Delhi Catering Services" />
  <meta name="author" content="Guddu Caterer" />
  <link rel="canonical" href="https://www.gudducaterer.in" />
  
  {/* WebPage Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Home | Guddu Caterer",
        description:
          "Welcome to Guddu Caterer - The Best Catering Service Provider in Delhi for weddings, events, and special occasions.",
        url: "https://www.gudducaterer.in",
        publisher: {
          "@type": "Organization",
          name: "Guddu Caterer",
          logo: {
            "@type": "ImageObject",
            url: "https://www.gudducaterer.in/logo.png",
          },
        },
      }),
    }}
  />

  {/* Organization Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Guddu Caterer",
        url: "https://www.gudducaterer.in",
        logo: "https://www.gudducaterer.in/logo.png",
        sameAs: [
          "https://www.facebook.com/GudduCaterer",
          "https://www.instagram.com/GudduCaterer",
          "https://www.twitter.com/GudduCaterer",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9278422664",
          contactType: "Customer Service",
          areaServed: "Delhi, India",
          availableLanguage: ["English", "Hindi"],
        },
      }),
    }}
  />

  {/* LocalBusiness Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Guddu Caterer",
        description: "Professional Catering Services in Delhi for Weddings, Parties, and Corporate Events.",
        url: "https://www.gudducaterer.in",
        telephone: "+91-9278422964",
        address: {
          "@type": "PostalAddress",
          streetAddress: "A-1, Rajhans Vihar, Carnal Bhatia Road, Vikas Nagar",
          addressLocality: "New-Delhi",
          addressRegion: "Delhi",
          postalCode: "110059",
          addressCountry: "IN",
        },
        openingHours: "Mo-Su 09:00-22:00",
        priceRange: "Rs. 300 par Plate",
        image: "https://www.gudducaterer.in/logo.png",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "28.613939",
          longitude: "77.209023",
        },
      }),
    }}
  />
</Head>

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
