// src/app/api/buffets/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Ensure this is the correct path to your dbConnect function
import Buffet from "@/models/buffetSchema";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const buffetData = await req.json(); // Correctly parse the request body

    const { title, description, cookPrice, category, dishes, prices, offers } = buffetData;

    // Validate required fields
    if (!title || !description || !cookPrice || !category || !dishes || !prices || !offers) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate dishes structure
    if (typeof dishes !== "object" || Array.isArray(dishes)) {
      return NextResponse.json(
        { message: "Dishes must be an object." },
        { status: 400 }
      );
    }

    // Validate prices structure
    const requiredPriceKeys = [50, 100, 200, 500, 1000];
    for (const key of requiredPriceKeys) {
      if (typeof prices[key] !== 'number') {
        return NextResponse.json(
          { message: `Price for ${key} guests is required and must be a number.` },
          { status: 400 }
        );
      }
    }

    // Validate offers structure
    if (!Array.isArray(offers) || offers.some(offer => !offer.name || !offer.discount || !offer.validUntil)) {
      return NextResponse.json(
        { message: "Offers must be an array of objects with name, discount, and validUntil." },
        { status: 400 }
      );
    }

    // Find the buffet by ID and update it
    const buffet = await Buffet.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        cookPrice,
        category,
        dishes: new Map(Object.entries(dishes)), // Convert the object to a Map
        prices,
        offers,
      },
      { new: true } // Return the updated document
    );

    if (!buffet) {
      return NextResponse.json(
        { message: "Buffet not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Buffet updated", buffet });
  } catch (error: unknown) {
    console.error("Error updating buffet:", error);

    // Handle validation errors from Mongoose
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle other types of errors (e.g., database connection issues)
    return NextResponse.json(
      { message: "Failed to update buffet. Please try again." },
      { status: 500 }
    );
  }
}