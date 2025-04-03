// src/types/predefinedOffers.ts

export const PredefinedOffers = {
    SUMMER_SEASON: { name: "Summer Season Off", discount: 30 },
    WINTER_SEASON: { name: "Winter Season Off", discount: 30 },
    HOLIDAY_SALE: { name: "Holiday Sale", discount: 20 },
    TEN_PERCENT_OFF: { name: "10% Off", discount: 10 },
    TWENTY_PERCENT_OFF: { name: "20% Off", discount: 20 },
    FESTIVE_SALE: { name: "Festive Sale", discount: 25 },
    SUNDAY_SPECIAL: { name: "Sunday Special", discount: 15 },
    CAUSAL_OFFERS: { name: "Causal Offers", discount: 15 },
};
  // Define a type for the offers
  export type PredefinedOffer = typeof PredefinedOffers[keyof typeof PredefinedOffers];
  
  // Type for the keys of predefined offers
  export type PredefinedOfferKey = keyof typeof PredefinedOffers;