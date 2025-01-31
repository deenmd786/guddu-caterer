export const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home | Guddu Caterer",
    "description": "Welcome to Guddu Caterer - The Best Catering Service Provider in Delhi for weddings, events, and special occasions.",
    "url": "https://www.gudducaterer.in",
    "publisher": {
      "@type": "Organization",
      "name": "Guddu Caterer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.gudducaterer.in/logo.png"
      }
    }
  };
  
  export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Guddu Caterer",
    "url": "https://www.gudducaterer.in",
    "logo": "https://www.gudducaterer.in/logo.png",
    "sameAs": [
      "https://www.facebook.com/gudducaterer",
      "https://www.instagram.com/gudducaterer",
      "https://www.twitter.com/gudducaterer"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9278422664",
      "contactType": "Customer Service",
      "areaServed": "Delhi, India",
      "availableLanguage": ["English", "Hindi"]
    }
  };
  
  export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Guddu Caterer",
    "description": "Professional Catering Services in Delhi for Weddings, Parties, and Corporate Events.",
    "url": "https://www.gudducaterer.in",
    "telephone": "+91-9278422964",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A-1, Rajhans Vihar, Carnal Bhatia Road, Vikas Nagar",
      "addressLocality": "New-Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110059",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 09:00-22:00",
    "priceRange": "Rs. 300 par Plate",
    "image": "https://www.gudducaterer.in/logo.png",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.613939",
      "longitude": "77.209023"
    }
  };