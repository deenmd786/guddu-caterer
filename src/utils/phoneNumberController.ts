// utils/phoneNumberController.ts
import { fetcher } from "./api"; // Adjust the path as necessary
import { PhoneNumber } from "../types/PhoneNumber"; // Adjust the path as necessary

interface PhoneNumbersResponse {
  phoneNumbers: PhoneNumber[]; // Assuming the response has a 'phoneNumbers' field that is an array of PhoneNumber
}

interface CreatePhoneNumberResponse {
  phoneNumber: PhoneNumber; // Adjust this type if needed based on the API's response structure
}

// Function to fetch all phone numbers
export const getPhoneNumbers = async (): Promise<PhoneNumber[]> => {
  try {
    const response = await fetcher("/api/phoneNumbers");
    const data = response as PhoneNumbersResponse;
    return Array.isArray(data.phoneNumbers) ? data.phoneNumbers : [];
  } catch (error) {
    console.error("Error fetching phone numbers:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to create a new phone number
export const createPhoneNumber = async (
  phoneData: Omit<PhoneNumber, "_id">
): Promise<CreatePhoneNumberResponse | { message: string }> => {
  try {
    const response = await fetcher<CreatePhoneNumberResponse>("/api/phoneNumbers", {
      method: "POST",
      body: JSON.stringify(phoneData),
    });

    console.log("Phone number created:", response.phoneNumber);
    return response; // Ensure `response` is of type `CreatePhoneNumberResponse`
  } catch (error) {
    console.error("Failed to create phone number:", error);
    return { message: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};