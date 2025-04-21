import { IBuffetData } from "@/types/buffetTypes";
import { fetcher } from "./api";

// Type guard to check if the error is an instance of Error
const isError = (error: unknown): error is Error =>
  error instanceof Error && typeof error.message === "string";

// Function to create a new buffet
export const createBuffet = async (
  buffetData: Omit<IBuffetData, "id" | "_id">
): Promise<{ message: string; buffet?: IBuffetData }> => {
  try {
    const response = await fetcher<{ message: string; buffet: IBuffetData }>(
      "/api/buffets",
      {
        method: "POST",
        body: JSON.stringify(buffetData),
      }
    );

    return response;
  } catch (error: unknown) {
    console.error("❌ Failed to create buffet:", error);
    return {
      message: error instanceof Error ? error.message : "Unknown error occurred while creating buffet.",
    };
  }
};


// Function to fetch buffet by category
export const getBuffetbyCategory = async (
  category?: string
): Promise<{ message: string; buffets?: IBuffetData[] } | { message: string }> => {
  try {
    console.log("category", category);
    
    const url = category ? `/api/buffets?category=${category}` : "/api/buffets";

    const response = await fetcher<{ message: string; buffets: IBuffetData[] }>(url, {
      method: "GET",
    });

    console.log("✅ Fetched buffets:", response.buffets);
    return response;
  } catch (error: unknown) {
    console.error("❌ Failed to fetch buffets:", error);
    return { message: isError(error) ? error.message : "Unknown error occurred while fetching buffets." };
  }
};

// Function to update an existing buffet
export const updateBuffet = async (
  buffetData: IBuffetData
): Promise<{ message: string; buffet?: IBuffetData } | { message: string }> => {
  try {
    const response = await fetcher<{ message: string; buffet: IBuffetData }>(`/api/buffets/${buffetData._id}`, {
      method: "PUT",
      body: JSON.stringify(buffetData),
    });

    console.log("✅ Buffet updated:", response.buffet);
    return response;
  } catch (error: unknown) {
    console.error("❌ Failed to update buffet:", error);
    return { message: isError(error) ? error.message : "Unknown error occurred while updating buffet." };
  }
};
