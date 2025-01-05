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
          setError(null); // Clear any previous errors
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
        <title>Guddu Catering - Exceptional Catering Services in Delhi</title>
        <meta
          name="description"
          content="Guddu Catering offers the best catering services in Delhi, specializing in weddings, parties, and corporate events. Live cooking, customized buffets, and more!"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section id="home" className="text-[var(--background)] overflow-x-hidden">
          <CatBanner />
        </section>

        <section id="services">
          <OurServices />
        </section>

        {/* Optional: Uncomment and use when ready */}
        {/* <section id="menu">
          <ShowProduct />
        </section> */}

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
