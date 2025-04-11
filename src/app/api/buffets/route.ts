import { NextRequest, NextResponse } from "next/server";
import { Error as MongooseError } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import Buffet from "@/models/buffetSchema";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const buffetData = await req.json();
    const { title, description, cookPrice, category, dishes, prices, offer } = buffetData;

    // Check required fields
    if (!title || !description || !cookPrice || !category || !dishes || !prices || !offer) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Dishes validation
    if (typeof dishes !== "object" || Array.isArray(dishes)) {
      return NextResponse.json(
        { message: "Dishes must be an object." },
        { status: 400 }
      );
    }

    // Prices validation (as strings)
    const requiredPriceKeys = ["50", "100", "200", "500", "1000"];
    for (const key of requiredPriceKeys) {
      const price = prices[key];
      if (!price || isNaN(Number(price))) {
        return NextResponse.json(
          { message: `Price for ${key} guests is required and must be a valid number.` },
          { status: 400 }
        );
      }
    }

    // Convert prices from string to number if needed (optional)
    const convertedPrices: Record<string, number> = {};
    for (const [key, value] of Object.entries(prices)) {
      convertedPrices[key] = Number(value);
    }

    // Save buffet
    const buffet = new Buffet({
      title,
      description,
      cookPrice: Number(cookPrice),
      category,
      dishes: new Map(Object.entries(dishes)),
      prices: convertedPrices,
      offer,
    });

    await buffet.save();

    return NextResponse.json({ message: "Buffet created", buffet });
  } catch (error: unknown) {
    console.error("Error creating buffet:", error);

    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create buffet. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const query = category ? { category } : {};
    const buffets = await Buffet.find(query);
    return NextResponse.json({ message: "Buffets retrieved", buffets });
  } catch (error) {
    console.error("Error fetching buffets:", error);
    return NextResponse.json(
      { message: "Failed to retrieve buffets. Please try again." },
      { status: 500 }
    );
  }
}
