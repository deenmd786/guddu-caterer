"use client";

import Head from "next/head";
import WhyChooseUs from "../../components/layout/WhyChooseUs";
import AboutHome from "./_components/AboutHome";
import Specialization from "./_components/Specialization";
import WhatWeOffer from "./_components/WhatWeOffer";

const AboutUs = () => {
    return (
        <>
            <Head>
                <title>About Us | Guddu Catering Service</title>
                <meta
                    name="description"
                    content="Learn more about Guddu Catering Service, our values, and the exceptional services we offer. Discover why we are the best choice for your catering needs."
                />
                <meta name="robots" content="index, follow" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            name: "About Us - Guddu Catering Service",
                            description: "Learn more about Guddu Catering Service, our values, and the exceptional services we offer. Discover why we are the best choice for your catering needs.",
                            url: "https://www.gudducaterer.in/about-us",
                        }),
                    }}
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