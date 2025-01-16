import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import PhoneNumber from "@/models/phoneModel"; // Ensure this points to the correct model

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { phoneNumber, products } = await req.json(); // Destructure products from the request body
    console.log("phoneData: ", phoneNumber, products);

    // Validate phone number input
    if (!phoneNumber) {
      return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
    }

    // Validate products input
    if (!Array.isArray(products) || !products.every(product => typeof product === 'string')) {
      return NextResponse.json({ message: "Products must be an array of strings." }, { status: 400 });
    }

    // Wrap products in another array to match the schema
    const wrappedProducts = [products]; // This is correct for your schema
    console.log("wrappedProducts : ", phoneNumber, wrappedProducts);

    // Check if the phone number already exists
    const existingEntry = await PhoneNumber.findOne({ phoneNumber });

    if (existingEntry) {
      // If the phone number exists, update the products array
      existingEntry.products.push(products); // Add new products to the existing array
      await existingEntry.save();
      return NextResponse.json({ message: "Phone number updated successfully.", existingEntry }, { status: 200 });
    } else {
      // Create a new phone number entry with products
      const newPhoneNumber = new PhoneNumber({ phoneNumber, products: wrappedProducts });
      await newPhoneNumber.save();
      return NextResponse.json({ message: "Phone number added successfully.", newPhoneNumber }, { status: 201 });
    }
  } catch (error) {
    console.error("Error adding phone number:", error);

    // Handle validation errors specifically
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message, errors: error.errors }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({ message: "Failed to add phone number. Please try again." }, { status: 500 });
  }
}