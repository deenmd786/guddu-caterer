import { NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends NextSeoProps {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords?: string; // Optional keywords prop
}

const Seo: React.FC<SeoProps> = ({ title, description, url, image, keywords }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: keywords || 'Catering service in delhi', // Use the keywords prop or an empty string if not provided
        },
      ]}
    />
  );
};

export default Seo;