"use client"
import { NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends NextSeoProps {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords?: string; // Optional keywords prop
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  url,
  image,
  keywords,
}) => {
  // Default values for SEO properties
  const defaultTitle = "Guddu Catering Services - Best Catering Services in Delhi for Weddings, Parties & Events"; // Replace with your default title
  const defaultDescription = "Hire Guddu Catering Services for the best catering services in Delhi. Specializing in weddings, parties, and corporate events with live cooking and customized buffets."; // Replace with your default description
  const defaultUrl = "https://gudducaterer.in"; // Replace with your default URL
  const defaultImage = "https://gudducaterer.in/logo.png"; // Replace with your default image URL

  return (
    <NextSeo
      title={title || defaultTitle}
      description={description || defaultDescription}
      canonical={url || defaultUrl}
      openGraph={{
        url: url || defaultUrl,
        title: title || defaultTitle,
        description: description || defaultDescription,
        images: [
          {
            url: image || defaultImage,
            width: 1200,
            height: 630,
            alt: title || defaultTitle,
          },
        ],
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: keywords || "Catering service in Delhi", // Use the keywords prop or a default string if not provided
        },
      ]}
    />
  );
};

export default Seo; 