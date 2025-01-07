// types/PhoneNumber.ts
export interface PhoneNumber {
    _id: string; // Unique identifier for the phone number (MongoDB ObjectId)
    phoneNumber: string; // The actual phone number as a string
    createdAt?: string; // Optional timestamp for when the phone number was created
    updatedAt?: string; // Optional timestamp for when the phone number was last updated
  }