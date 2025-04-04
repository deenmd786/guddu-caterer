import { NextRequest, NextResponse } from "next/server";
import mongoose, { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Ensure this is the correct path to your dbConnect function
import Buffet from "@/models/buffetSchema";

export async function PUT(req: NextRequest,
  context: { params: Promise<{ id: string }> }
  ) {
    const params = await context.params;
  await dbConnect();

  // Validate the product ID
      if (!mongoose.Types.ObjectId.isValid(params.id)) {
        console.log("Invalid product ID: ", params.id);
        return NextResponse.json(
          { success: false, error: "Invalid product ID" },
          { status: 400 }
        );
      }
  try {
    const buffetData = await req.json(); // Correctly parse the request body

    const { title, description, cookPrice, category, dishes, prices, offer } = buffetData; // Changed 'offers' to 'offer'

    // Validate required fields
    if (!title || !description || !cookPrice || !category || !dishes || !prices || !offer) {
      return NextResponse.json(
        { message: "All fields are required." },
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

    // Find the buffet by ID and update it
    const buffet = await Buffet.findByIdAndUpdate(
      params.id, // Use the extracted id directly
      {
        title,
        description,
        cookPrice,
        category,
        dishes: Object.fromEntries(dishes), // Convert the object to a Map if needed, or keep it as an object
        prices,
        offer, // Ensure this matches your schema
      },
      { new: true, runValidators: true } // Return the updated document and run validators
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