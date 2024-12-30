"use client";

import AboutUs from "../components/layout/AboutUs";
import CatBanner from "../components/layout/CatBanner";
import OurServices from "../components/layout/OurServices";
import OurTestimonials from "../components/layout/OurTestimonials";
import LayoutWithImages from "../components/layout/StoryLayout";
import WhyChooseUs from "../components/layout/WhyChooseUs";
import Header from "../components/ui/Header";
import { setUser  } from "../redux/userSlice";
import { User } from "../types/User";
import apiHelper from "../utils/apiHelper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


interface ApiResponse {
  message?: string;
  user?: User;
}

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data: ApiResponse = await apiHelper("/api/user/me", {
          method: "POST",
        });
        if (data.user) {
          dispatch(setUser (data.user));
        } else {
          console.error(data.message || "User  data not found");
        }
      } catch (err) {
        console.error(err instanceof Error ? err.message : "An error occurred");
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
      </main>
    </>
  );
}