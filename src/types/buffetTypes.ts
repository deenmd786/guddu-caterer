export interface IBuffetData {
  _id?: string; // Optional ID
  title: string;
  description: string;
  cookPrice: number;
  category: "Wedding" | "Birthday" | "Corporate" | "Festival" | "Anniversary" | "Casual Party";
  dishes: {
    [key: string]: { title: string; imageUrl: string; }[]; // Each key maps to an array of dish objects
  };
  prices: { [key: number]: number }; // More flexible pricing structure
  offer: string;
}

export interface IDish {
  title: string;
  imageUrl: string;
}