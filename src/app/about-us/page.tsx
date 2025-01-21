
import { Metadata } from "next";
import WhyChooseUs from "../../components/layout/WhyChooseUs";
import AboutHome from "./_components/AboutHome";
import Specialization from "./_components/Specialization";
import WhatWeOffer from "./_components/WhatWeOffer";

export const metadata: Metadata = {
    title: "About Us - Guddu Catering",
    description: "Learn more about Guddu Catering, the leading catering service provider in Delhi. We specialize in premium catering for weddings, corporate events, and private parties. Enjoy customizable buffets, live cooking stations, and top-notch service for every occasion.",
  };
  

const AboutUs = () => {
    return (
        <>
            <section>
                <AboutHome />
            </section>
            <section>
                <WhatWeOffer />
            </section>
            <section>
                <Specialization />
            </section>
            <section className="bg-slate-100">
                <WhyChooseUs />
                <p className="text-center py-8 text-gray-900 font-semibold">
                    Our focus is on health, flavor, and variety, making us the perfect choice for those seeking ethical and delectable catering services.
                </p>
            </section>
        </>
    );
};

export default AboutUs;