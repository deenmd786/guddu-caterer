// utils/phoneNumberController.ts
import { PhoneNumber } from "../types/PhoneNumber";

interface CreatePhoneNumberResponse {
  phoneNumber: PhoneNumber;
}

interface ApiResponse<T> {
  status: number; // HTTP status code
  data: T | null; // The actual data returned from the API
  message?: string; // Optional message for errors
}

// utils/phoneNumberController.ts
export const checkUserExistence = async (
  phoneNumber: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await fetch("/api/phoneNumber/checkUser ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }), // Pass the phone number as an object
    });

    const data = await response.json();
    console.log("data", data);
    

    return {
      status: response.status,
      data: response.ok ? data : null,
      message: response.ok ? undefined : (data as { message: string }).message || "API error",
    };
  } catch (error) {
    console.error("Failed to check user existence:", error);
    return {
      status: 500,
      data: null,
      message: error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
};

export const createPhoneNumber = async (
  phoneData: Omit<PhoneNumber, "_id"> & { products: string[] } // Include products in the type
): Promise<ApiResponse<CreatePhoneNumberResponse | { message: string }>> => {
  try {
    const response = await fetch("/api/phoneNumbers/registerUser ", { // Ensure the URL is correct
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phoneData),
    });

    const data = await response.json();

    return {
      status: response.status,
      data: response.ok ? data : null,
      message: response.ok ? undefined : (data as { message: string }).message || "API error",
    };
  } catch (error) {
    console.error("Failed to create phone number:", error);
    return {
      status: 500,
      data: null,
      message: error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
};
