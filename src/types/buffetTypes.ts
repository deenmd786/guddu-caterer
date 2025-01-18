
export interface IBuffetData {
  id?: string;
  title: string;
  minPrice: number;
  maxPrice: number;
  gatheringSize: "small" | "medium" | "large";
  categories: {
    [key: string]: { title: string; imageUrl: string }[]; // Key-value pairs for categories
  };
}