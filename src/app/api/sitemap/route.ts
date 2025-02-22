import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://www.gudducaterer.in";

  const pages = [
    "/",
    "/about-us",
    "/contact-us",
    "/auth/login",
    "/dashboard/book-buffet/menu",
    "/services/wedding-catering-services-in-delhi",
    "/services/engagement-catering-service-in-delhi",
    "/services/corporate-lunch-catering-services-in-delhi",
    "/services/private-event-catering-in-delhi",
    "/services/outdoor-catering-service-in-delhi",
    "/services/birthday-party-food-catering",
    "/services/popular-catering-for-house-party-in-delhi",
    "/services/festival-catering-services",
    "/services/cocktail-parties-at-home",
    "/services/funeral-catering-service-in-delhi",
    "/services/catering-booking-for-banquet-halls-in-delhi",
    "/services/small-party-catering",
    "/services/home-food-catering",
    "/auth/forgot-password",
    "/auth/signup",
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/profile-settings",
    "/dashboard/orders",
    "/dashboard/book-buffet/cart",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === "/" ? "1.00" : "0.80"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(sitemap);
}
