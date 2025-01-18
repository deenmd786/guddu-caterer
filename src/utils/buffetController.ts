import { IBuffetData } from "@/types/buffetTypes"; // Import the IBuffetData interface
import { fetcher } from "./api";

export const createBuffet = async (
  buffetData: Omit<IBuffetData, "id" | "_id"> // Accept buffetData as a parameter
): Promise<{ message: string; buffet?: IBuffetData } | { message: string }> => {
  try {
    const response = await fetcher<{ message: string; buffet: IBuffetData }>("/api/buffet", {
      method: "POST",
      body: JSON.stringify(buffetData), // Send the provided buffetData
    });

    console.log("Buffet created:", response.buffet);
    return response; // Ensure `response` is of type `{ message: string; buffet?: IBuffetData }`
  } catch (error) {
    console.error("Failed to create buffet:", error);
    return { message: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};