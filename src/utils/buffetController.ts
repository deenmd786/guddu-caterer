// src/utils/buffetController.ts

import { IBuffetData } from "@/types/buffetTypes"; // Import the IBuffetData interface
import { fetcher } from "./api";

// Function to create a new buffet
export const createBuffet = async (
  buffetData: Omit<IBuffetData, "id" | "_id"> // Accept buffetData as a parameter
): Promise<{ message: string; buffet?: IBuffetData } | { message: string }> => {
  try {
    const response = await fetcher<{ message: string; buffet: IBuffetData }>("/api/buffets", {
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

export const getBuffetbyCategory = async (category?: string): Promise<{ message: string; buffets?: IBuffetData[] } | { message: string }> => {
  try {
    // Construct the URL with the category query parameter if provided
    const url = category ? `/api/buffets?category=${encodeURIComponent(category)}` : "/api/buffets";
    
    const response = await fetcher<{ message: string; buffets: IBuffetData[] }>(url, {
      method: "GET",
    });

    console.log("Fetched buffets:", response.buffets);
    return response; // Ensure `response` is of type `{ message: string; buffets?: IBuffetData[] }`
  } catch (error) {
    console.error("Failed to fetch buffets:", error);
    return { message: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};

// Function to update an existing buffet
export const updateBuffet = async (
  buffetData: IBuffetData // Accept buffetData as a parameter
): Promise<{ message: string; buffet?: IBuffetData } | { message: string }> => {
  try {
    const response = await fetcher<{ message: string; buffet: IBuffetData }>(`/api/buffets/${buffetData._id}`, {
      method: "PUT",
      body: JSON.stringify(buffetData), // Send the provided buffetData
    });

    console.log("Buffet updated:", response.buffet);
    return response; // Ensure `response` is of type `{ message: string; buffet?: IBuffetData }`
  } catch (error) {
    console.error("Failed to update buffet:", error);
    return { message: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};