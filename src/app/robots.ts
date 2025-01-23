import { MetadataRoute } from "next";

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/auth/", "/dashboard/", "/assets/"],
      allow: ["/", "/auth/signup", "/auth/login"]
    },
    sitemap: 'https://www.gudducaterer.in/sitemap.xml',
  };
}

export default robots;