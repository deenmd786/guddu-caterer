export interface IBuffetData {
  _id?: string; // Optional ID
  title: string;
  description: string;
  cookPrice: string;
  category: "Birthday" | "Corporate" | "Festival" | "Anniversary" | "Casual Party"|"Wedding";
  dishes: {
    [key: string]: { title: string; imageUrl: string; }[]; // Each key maps to an array of dish objects
  };
  discounts: { [key: string]: string }; // More flexible pricing structure
  perPlate: string;
}

export interface IDish {
  title: string;
  imageUrl: string;
}