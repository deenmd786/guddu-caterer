"use client";

import Head from "next/head";

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard | Guddu Catering Service</title>
        <meta
          name="description"
          content="Welcome to the Admin Panel of Guddu Catering Service. Manage your users, products, and other resources here."
        />
        <meta name="robots" content="noindex, nofollow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Admin Dashboard - Guddu Catering Service",
              description: "Welcome to the Admin Panel of Guddu Catering Service. Manage your users, products, and other resources here.",
              url: "https://www.gudducaterer.in/admin",
            }),
          }}
        />
      </Head>
      <div className="p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg text-gray-700 mb-4">Welcome to the Admin Panel. Manage your users, products, and other resources here.</p>
      </div>
    </>
  );
};

export default AdminPage;