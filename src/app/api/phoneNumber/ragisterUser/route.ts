// pages/api/phoneNumbers/registerUser .ts
import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import PhoneNumber from "@/models/phoneModel"; // Ensure this points to the correct model

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { phoneNumber, products } = await req.json(); // Destructure products from the request body

    // Validate phone number input
    if (!phoneNumber) {
      return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
    }

    // Validate products input
    if (!Array.isArray(products)) {
      return NextResponse.json({ message: "Products must be an array." }, { status: 400 });
    }

    // Check if the phone number already exists
    const exists = await PhoneNumber.findOne({ phoneNumber });
    if (exists) {
      return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    }

    // Create a new phone number entry with products
    const newPhoneNumber = new PhoneNumber({ phoneNumber, products });
    await newPhoneNumber.save();

    return NextResponse.json({ message: "Phone number added successfully.", newPhoneNumber }, { status: 201 });
  } catch (error) {
    console.error("Error adding phone number:", error);

    // Handle validation errors specifically
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ message: "Failed to add phone number. Please try again." }, { status: 500 });
  }
}