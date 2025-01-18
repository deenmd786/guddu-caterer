import { NextRequest, NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Ensure this is the correct path to your dbConnect function
import Buffet from "@/models/buffetSchema";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const buffetData = await req.json(); // Correctly parse the request body

    const { title,cookPrice, minPrice, maxPrice, gatheringSize, categories } = buffetData;
    if (!title || !cookPrice || !minPrice || !maxPrice || !gatheringSize || !categories || typeof categories !== "object") {
      return NextResponse.json(
        { message: "All fields are required and categories must be an object." },
        { status: 400 }
      );
    }

    // Create a new buffet instance
    const buffet = new Buffet({
      title,
      cookPrice,
      minPrice,
      maxPrice,
      gatheringSize,
      categories,
    });

    await buffet.save();

    return NextResponse.json({ message: "Buffet created", buffet });
  } catch (error: unknown) {
    console.error("Error creating buffet:", error);

    // Handle validation errors from Mongoose
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle other types of errors (e.g., database connection issues)
    return NextResponse.json(
      { message: "Failed to create buffet. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const buffets = await Buffet.find(); // Fetch all buffet records
    return NextResponse.json({ message: "Buffets retrieved", buffets });
  } catch (error) {
    console.error("Error fetching buffets:", error);
    return NextResponse.json(
      { message: "Failed to retrieve buffets. Please try again." },
      { status: 500 }
    );
  }
}
