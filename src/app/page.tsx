"use client";

import AboutUs from "../components/layout/AboutUs";
import CatBanner from "../components/layout/CatBanner";
import OurServices from "../components/layout/OurServices";
import OurTestimonials from "../components/layout/OurTestimonials";
import LayoutWithImages from "../components/layout/StoryLayout";
import WhyChooseUs from "../components/layout/WhyChooseUs";
import Header from "../components/ui/Header";
import { setUser } from "../redux/userSlice";
import { User } from "../types/User";
import apiHelper from "../utils/apiHelper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

interface ApiResponse {
  message?: string;
  user?: User;
}

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data: ApiResponse = await apiHelper("/api/user/me", {
          method: "POST",
        });
        if (data?.user) {
          dispatch(setUser(data.user));
          setError(null);
        } else {
          setError(data.message || "User data not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <>
            <Head>
        <title>
          Guddu Catering Services - Best Catering Services in Delhi for Weddings, Parties & Events
        </title>
        <meta
          name="description"
          content="Hire Guddu Catering Services for the best catering services in Delhi. Specializing in weddings, parties, and corporate events with live cooking and customized buffets."
        />
        <meta
          name="keywords"
          content="catering services in Delhi, caterers in Delhi, wedding catering, party catering, event catering, corporate catering, customized buffets, live cooking, Guddu Catering Services"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Guddu Catering" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://gudducaterer.in" />
        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="Guddu Catering Services - Best Catering Services in Delhi" />
        <meta
          property="og:description"
          content="Hire Guddu Catering Services for top-notch catering in Delhi. Perfect for weddings, parties, and corporate events with live cooking and customized buffets."
        />
        <meta property="og:image" content="https://gudducaterer.in/path-to-image.jpg" />
        <meta property="og:url" content="https://gudducaterer.in" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guddu Catering Services - Best Catering Services in Delhi" />
        <meta
          name="twitter:description"
          content="Hire Guddu Catering Services for top-notch catering in Delhi. Perfect for weddings, parties, and corporate events with live cooking and customized buffets."
        />
        <meta name="twitter:image" content="https://gudducaterer.in/path-to-image.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Guddu Catering Services",
              description:
                "Guddu Catering Services specializes in catering for weddings, parties, and corporate events in Delhi, offering customized buffet options and live cooking.",
              image: "https://gudducaterer.in/path-to-image.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressRegion: "DL",
                postalCode: "110001",
                addressCountry: "IN",
              },
              telephone: "+91-1234567890",
              url: "https://gudducaterer.in",
              sameAs: [
                "https://www.facebook.com/gudducatering",
                "https://www.instagram.com/gudducatering",
              ],
            }),
          }}
        />
      </Head>

      <Header />

      <main>
        <section
          id="home"
          className="text-[var(--background)] overflow-x-hidden"
        >
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

        {/* Optional: Loading/Error UI */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </main>
    </>
  );
}
