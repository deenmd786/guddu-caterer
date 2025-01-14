
import Head from "next/head";
import WhyChooseUs from "../../components/layout/WhyChooseUs";
import AboutHome from "./_components/AboutHome";
import Specialization from "./_components/Specialization";
import WhatWeOffer from "./_components/WhatWeOffer";
import Seo from "@/components/reuseable/Seo";

const AboutUs = () => {
    return (
        <>
            <Head>
            <Seo
        title="About Us - Guddu Catering Services"
        description="Learn more about Guddu Catering Services, our journey, and the exceptional catering services we provide in Delhi."
        url="https://gudducaterer.in/about-us"
        image="https://gudducaterer.in/logo.png"
        keywords="About Guddu Catering, Catering Services, Delhi Catering"
      />
            </Head>
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