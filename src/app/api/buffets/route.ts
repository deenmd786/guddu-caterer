import { NextRequest, NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Ensure this is the correct path to your dbConnect function
import Buffet from "@/models/buffetSchema";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const buffetData = await req.json(); // Correctly parse the request body

    const { title, description, cookPrice, category, dishes, prices, offer } = buffetData; // Corrected 'offers' to 'offer'

    // Validate required fields
    if (!title || !description || !cookPrice || !category || !dishes || !prices || !offer) {
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

    // Create a new buffet instance
    const buffet = new Buffet({
      title,
      description,
      cookPrice,
      category,
      dishes: new Map(Object.entries(dishes)), // Convert the object to a Map
      prices,
      offer, // Corrected to match the incoming data structure
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

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category'); // Get the category from the query parameters

  try {
    const query = category ? { category } : {}; // If a category is provided, filter by it
    const buffets = await Buffet.find(query); // Fetch buffets based on the query
    return NextResponse.json({ message: "Buffets retrieved", buffets });
  } catch (error) {
    console.error("Error fetching buffets:", error);
    return NextResponse.json(
      { message: "Failed to retrieve buffets. Please try again." },
      { status: 500 }
    );
  }
}