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
          setError(data.message || "User  data not found");
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
