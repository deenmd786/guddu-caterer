import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `
User-agent: *
Disallow: /auth/
Disallow: /dashboard/
Disallow: /assets/
Allow: /

Sitemap: https://www.gudducaterer.in/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
