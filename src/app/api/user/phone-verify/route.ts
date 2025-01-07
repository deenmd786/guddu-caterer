// pages/api/phoneNumbers/route.ts
import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Adjust the path as necessary
import PhoneNumber from "@/models/phoneModel";

export async function GET() {
  await dbConnect();
  try {
    const phoneNumbers = await PhoneNumber.find();
    return NextResponse.json({ phoneNumbers });
  } catch (error: unknown) {
    console.error("Error fetching phone numbers:", error);
    return NextResponse.json({ message: "Failed to fetch phone numbers." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const phoneData = await req.json();
    const { phoneNumber } = phoneData;

    // Validate incoming data
    if (!phoneNumber) {
      return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
    }

    // Check for existing phone number
    const existingPhoneNumber = await PhoneNumber.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return NextResponse.json(
        { message: "Phone number already exists." },
        { status: 400 }
      );
    }

    // Create a new phone number instance
    const newPhoneNumber = new PhoneNumber({ phoneNumber });

    // Save the phone number to the database
    await newPhoneNumber.save();

    return NextResponse.json({ message: "Phone number added", newPhoneNumber });
  } catch (error: unknown) {
    console.error("Error adding phone number:", error);
    
    // Handle validation errors from Mongoose
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle duplicate key errors (if applicable)
    if (error instanceof MongooseError && error.name === "MongoError") {
      return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    }

    // Handle other types of errors (e.g., database connection issues)
    return NextResponse.json({ message: "Failed to add phone number. Please try again." }, { status: 500 });
  }
}