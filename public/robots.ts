import { MetadataRoute } from "next";

function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/auth/forgot-password",
          "/dashboard",
          "/dashboard/*",
          "/assets/"
        ],
        allow: [
          "/",
          "/auth/signup",
          "/auth/login",
          "/about-us",
          "/contact-us",
          "/services/*"
        ]
      }
    ],
    sitemap: "https://www.gudducaterer.in/sitemap.xml",
  };
}

export default robots;
