// data/servicesData.ts

export type ServiceKey = 
  | "wedding-catering"
  | "private-parties"
  | "festival-catering"
  | "engagement-catering"
  | "corporate-catering"
  | "cocktail-parties"
  | "birthday-parties"
  | "funeral-catering"
  | "outdoor-catering";

export const servicesData: Record<ServiceKey, { image: string; altText: string; title: string; description: string }> = {
  "wedding-catering": {
    image: "https://storage.googleapis.com/a1aa/image/HVdq0cicEK5FH19qJ2weePe98tjeP8qdH9QawYJRpzUdAwuPB.jpg",
    altText: "Elegant wedding catering setup with beautifully arranged tables and a buffet spread",
    title: "Exquisite Wedding Catering for Your Dream Day",
    description: "From appetizers to desserts, we craft unforgettable culinary experiences for weddings of all sizes.",
  },
  "private-parties": {
    image: "/assets/services/private-parties.jpg",
    altText: "Exclusive private party catering setup",
    title: "Exclusive Private Party Catering Services",
    description: "Host an unforgettable private party with our exclusive catering services, offering a variety of gourmet foods and beverages in an intimate setting.",
  },
  "festival-catering": {
    image: "https://storage.googleapis.com/a1aa/image/aEhYmXa4jGprLp2LAhZc4nCsGdCbc9WOWlCRJIbQSBqw77eJA.jpg",
    altText: "Vibrant festival catering setup with colorful decorations, a variety of foods, and lively atmosphere",
    title: "Vibrant Festival Catering Services",
    description: "Celebrate with our exceptional festival catering services, offering a variety of delicious foods and a lively atmosphere.",
  },
  "engagement-catering": {
    image: "https://storage.googleapis.com/a1aa/image/0mXMb48S2Q6aLtIdhxNupYZmQDEGcdqGI7zIflPReBUz5u7TA.jpg",
    altText: "Sophisticated engagement catering setup with elegant table arrangements and delicious cuisine",
    title: "Engagement Catering Services",
    description: "Celebrate your engagement with a dining experience that’s as special and unforgettable as your love story.",
  },
  "corporate-catering": {
    image: "https://storage.googleapis.com/a1aa/image/zKnfq61X0d1nF625WQn5hIB8oDpFLanOWf99LYfBHEBRZfuPB.jpg",
    altText: "Professional corporate catering setup with a variety of foods, beverages, and elegant table settings",
    title: "Professional Corporate Catering Services",
    description: "Impress your clients and colleagues with our top-notch corporate catering services, offering a variety of gourmet foods and beverages.",
  },
  "cocktail-parties": {
    image: "https://storage.googleapis.com/a1aa/image/sPwWKmeL6sycGqLVMseWpPGbRjS3KNGUl3Msgje7cGOYPfuPB.jpg",
    altText: "Luxurious cocktail party setup with a variety of drinks, gourmet appetizers, and elegant decorations",
    title: "Elegant Cocktail Party Catering Services",
    description: "Elevate your cocktail party with our exquisite drinks and gourmet appetizers, crafted to perfection for a sophisticated experience.",
  },
  "birthday-parties": {
    image: "https://storage.googleapis.com/a1aa/image/fCf7YuafcbNrHICtbqfHn7o4cRLiNd9npCLsrX9HCUKeX8dfE.jpg",
    altText: "Vibrant birthday party catering setup with colorful decorations, a variety of foods, and snacks",
    title: "Fun and Festive Birthday Party Catering",
    description: "From delicious foods to tasty snacks, we create delightful culinary experiences for birthday parties of all ages.",
  },
  "funeral-catering": {
    image: "https://storage.googleapis.com/a1aa/image/xpKJvJDTJmZ7GJkeh2jMmFxJ2RFIpbjK0UrGr7MHceTp2v7TA.jpg",
    altText: "Elegant funeral catering setup with beautifully arranged tables and comforting meals",
    title: "Honoring Loved Ones with Compassionate Funeral Catering",
    description: "During times of loss, we offer heartfelt catering services to bring comfort and warmth to your gathering, with meals that soothe the soul and help bring people together in remembrance.",
  },
  "outdoor-catering": {
    image: "https://storage.googleapis.com/a1aa/image/egphO20XaRQ5GqVXpe6dFax5helZKstt1f9QriTZPzToqfdfE.jpg",
    altText: "Elegant outdoor catering setup with beautifully arranged tables and a buffet spread",
    title: "Savor the Outdoors with Guddu Catering for Your Journeys",
    description: "Whether it’s a scenic picnic, a beachside feast, or a mountain retreat, we bring flavors to match your adventures and create unforgettable dining experiences for tourists and outdoor events.",
  },
};