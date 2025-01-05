export type ServiceKey = 
  | "wedding-catering-services-in-delhi"
  | "private-event-catering-in-delhi"
  | "festival-catering-services"
  | "engagement-catering-service-in-delhi"
  | "corporate-lunch-catering-services-in-delhi"
  | "cocktail-parties-at-home"
  | "birthday-party-food-catering"
  | "funeral-catering-service-in-delhi"
  | "outdoor-catering-service-in-delhi"
  | "popular-catering-for-house-party-in-delhi"
  | "small-party-catering"
  | "home-food-catering";

export const servicesData: Record<ServiceKey, { image: string; altText: string; title: string; description: string }> = {
  "wedding-catering-services-in-delhi": {
    image: "https://storage.googleapis.com/a1aa/image/HVdq0cicEK5FH19qJ2weePe98tjeP8qdH9QawYJRpzUdAwuPB.jpg",
    altText: "Elegant wedding catering setup with beautifully arranged tables and a buffet spread",
    title: "Best Wedding Catering Services in Delhi",
    description: "Discover premium wedding catering services in Delhi, offering a blend of traditional and contemporary cuisines to make your big day extraordinary.",
  },
  "private-event-catering-in-delhi": {
    image: "/assets/services/private-parties.jpg", // Replace with a Google-hosted image if available
    altText: "Exclusive private party catering setup",
    title: "Exclusive Private Event Catering in Delhi",
    description: "Host an unforgettable private event with our custom catering services, tailored to suit your preferences and theme.",
  },
  "festival-catering-services": {
    image: "https://storage.googleapis.com/a1aa/image/aEhYmXa4jGprLp2LAhZc4nCsGdCbc9WOWlCRJIbQSBqw77eJA.jpg",
    altText: "Vibrant festival catering setup with colorful decorations and a variety of foods",
    title: "Festival and Cultural Event Catering in Delhi",
    description: "Celebrate festivals and cultural events with our diverse catering options designed to delight your guests.",
  },
  "engagement-catering-service-in-delhi": {
    image: "https://storage.googleapis.com/a1aa/image/0mXMb48S2Q6aLtIdhxNupYZmQDEGcdqGI7zIflPReBUz5u7TA.jpg",
    altText: "Sophisticated engagement catering setup with elegant table arrangements",
    title: "Top Engagement Catering Services in Delhi",
    description: "Celebrate your engagement with tailored catering solutions designed to impress your guests and create lasting memories.",
  },
  "corporate-lunch-catering-services-in-delhi": {
    image: "https://storage.googleapis.com/a1aa/image/zKnfq61X0d1nF625WQn5hIB8oDpFLanOWf99LYfBHEBRZfuPB.jpg",
    altText: "Professional corporate catering setup with a variety of foods and beverages",
    title: "Corporate Catering Services for Lunch and Events in Delhi",
    description: "Professional catering services for corporate lunches, conferences, and office events, ensuring quality and timeliness.",
  },
  "cocktail-parties-at-home": {
    image: "https://storage.googleapis.com/a1aa/image/sPwWKmeL6sycGqLVMseWpPGbRjS3KNGUl3Msgje7cGOYPfuPB.jpg",
    altText: "Luxurious cocktail party setup with a variety of drinks and gourmet appetizers",
    title: "Cocktail Party Catering Services for Home or Venues",
    description: "Elegant catering solutions for cocktail parties, offering a curated selection of appetizers, beverages, and main courses.",
  },
  "birthday-party-food-catering": {
    image: "https://storage.googleapis.com/a1aa/image/fCf7YuafcbNrHICtbqfHn7o4cRLiNd9npCLsrX9HCUKeX8dfE.jpg",
    altText: "Vibrant birthday party catering setup with colorful decorations and a variety of foods",
    title: "Birthday Party Catering Services in Delhi",
    description: "Make your birthday celebrations truly special with our delicious catering options and exceptional service.",
  },
  "funeral-catering-service-in-delhi": {
    image: "https://storage.googleapis.com/a1aa/image/xpKJvJDTJmZ7GJkeh2jMmFxJ2RFIpbjK0UrGr7MHceTp2v7TA.jpg",
    altText: "Elegant funeral catering setup with beautifully arranged tables and comforting meals",
    title: "Compassionate Funeral & Memorial Catering in Delhi",
    description: "Reliable and compassionate catering services for funerals and memorial gatherings, ensuring a stress-free experience.",
  },
  "outdoor-catering-service-in-delhi": {
    image: "https://storage.googleapis.com/a1aa/image/egphO20XaRQ5GqVXpe6dFax5helZKstt1f9QriTZPzToqfdfE.jpg",
    altText: "Elegant outdoor catering setup with beautifully arranged tables and a buffet spread",
    title: "Outdoor Catering Services for Banquets and Events in Delhi",
    description: "Enjoy exceptional outdoor catering for weddings, corporate picnics, and large gatherings with our expert team.",
  },
  "popular-catering-for-house-party-in-delhi": {
    image: "/assets/services/home-party.jpg", // Replace with a Google-hosted image if available
    altText: "Popular catering for house parties with a variety of foods",
    title: "Popular Catering for House Parties in Delhi",
    description: "Throw an amazing house party with our highly-rated catering services, offering delectable food and a seamless experience.",
  },
  "small-party-catering": {
    image: "/assets/services/small-party.jpg", // Replace with a Google-hosted image if available
    altText: "Catering setup for small parties with intimate arrangements",
    title: "Small Party Catering Services in Delhi",
    description: "Perfect catering solutions for small parties, family gatherings, and intimate events in Delhi.",
  },
  "home-food-catering": {
    image: "/assets/services/house-party.webp", // Replace with a Google-hosted image if available
    altText: "Home food catering setup with homemade-style food",
    title: "Home Food Catering for Small Events in Delhi",
    description: "Delightful catering services for home events, featuring homemade-style food and customizable menus.",
  },
};