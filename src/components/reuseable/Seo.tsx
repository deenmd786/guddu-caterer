"use client";

import { NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends Omit<NextSeoProps, 'title' | 'description' | 'canonical'> {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  image: string | undefined;
  keywords?: string | undefined; // Optional keywords prop
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  url,
  image,
  keywords,
}) => {
  // Default values for SEO properties
  const defaultTitle = "Guddu Catering Services - Best Catering Services in Delhi for Weddings, Parties & Events"; 
  const defaultDescription = "Hire Guddu Catering Services for the best catering services in Delhi. Specializing in weddings, parties, and corporate events with live cooking and customized buffets."; 
  const defaultUrl = "https://gudducaterer.in"; 
  const defaultImage = "https://gudducaterer.in/logo.png"; 

  return (
    <NextSeo
      title={title ?? defaultTitle} // Use nullish coalescing (??) to handle null/undefined
      description={description ?? defaultDescription}
      canonical={url ?? defaultUrl}
      openGraph={{
        url: url ?? defaultUrl,
        title: title ?? defaultTitle,
        description: description ?? defaultDescription,
        images: [
          {
            url: image ?? defaultImage,
            width: 1200,
            height: 630,
            alt: title ?? defaultTitle,
          },
        ],
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: keywords ?? "Catering service in Delhi", // Use nullish coalescing for optional keyword
        },
      ]}
    />
  );
};

export default Seo;
