// robots.ts

const robotsTxt = `
User -agent: *
Disallow: /auth/
Disallow: /dashboard/
Disallow: /assets/
Allow: /

Sitemap: https://www.gudducaterer.in/sitemap.xml
`;

export default robotsTxt.trim();
