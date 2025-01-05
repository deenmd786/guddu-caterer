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
        if (data.user) {
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
          Guddu Catering Service - Exceptional Catering Services for Weddings, Parties & Events in Delhi
        </title>
        <meta
          name="description"
          content="Experience the best catering services in Delhi with Guddu Catering. Specializing in weddings, parties, and corporate events, we offer live cooking, customized buffets, and exceptional service to make your event unforgettable!"
        />
        <meta
          name="keywords"
          content="catering service, wedding catering, party catering, event catering, live cooking, buffet catering, corporate events, Guddu Catering, catering services in Delhi, wedding planners, party food, Delhi catering services"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Guddu Catering" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Tags for Social Sharing */}
        <meta
          property="og:title"
          content="Guddu Catering Service - Exceptional Catering Services for Weddings, Parties & Events in Delhi"
        />
        <meta
          property="og:description"
          content="Guddu Catering Service offers top-notch catering for weddings, parties, and corporate events in Delhi. Experience customized buffet options, live cooking, and impeccable service."
        />
        <meta property="og:image" content="/path-to-image.jpg" /> {/* Replace with a relevant image URL */}
        <meta property="og:url" content="https://yourwebsite.com" /> {/* Replace with your actual URL */}
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Guddu Catering Service - Exceptional Catering Services for Weddings, Parties & Events in Delhi"
        />
        <meta
          name="twitter:description"
          content="Guddu Catering Service offers top-notch catering for weddings, parties, and corporate events in Delhi. Experience customized buffet options, live cooking, and impeccable service."
        />
        <meta name="twitter:image" content="/path-to-image.jpg" /> {/* Replace with your image URL */}
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
