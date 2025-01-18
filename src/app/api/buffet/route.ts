// app/api/buffet/route.ts
import { NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import { dbConnect } from "@/lib/dbConnect"; // Ensure this is the correct path to your dbConnect function
import Buffet from "@/models/buffetSchema";

export async function POST(req: NextResponse) {
  await dbConnect();

  try {
    const buffetData = await req.json();

    // Validate incoming data
    const { title, minPrice, maxPrice, gatheringSize, categories } = buffetData;
    if (!title || !minPrice || !maxPrice || !gatheringSize || !categories || typeof categories !== 'object') {
      return NextResponse.json({ message: "All fields are required and categories must be an object." }, { status: 400 });
    }

    // Create a new buffet instance
    const buffet = new Buffet({
      title,
      minPrice,
      maxPrice,
      gatheringSize,
      categories,
    });

//     const existingBuffet = await Buffet.findOne({ title });
// if (existingBuffet) {
//     return NextResponse.json({ message: "Buffet with this title already exists." }, { status: 400});
// }

    // Save the buffet to the database
    await buffet.save();

    return NextResponse.json({ message: "Buffet created", buffet });
  } catch (error: unknown) {
    console.error("Error creating buffet:", error);

    // Handle validation errors from Mongoose
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle other types of errors (e.g., database connection issues)
    return NextResponse.json({ message: "Failed to create buffet. Please try again." }, { status: 500 });
  }
}