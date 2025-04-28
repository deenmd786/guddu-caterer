import { NextRequest, NextResponse } from "next/server";
import mongoose, { Error as MongooseError } from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import Buffet from "@/models/buffetSchema";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    console.log("Invalid buffet ID: ", params.id);
    return NextResponse.json(
      { success: false, error: "Invalid buffet ID" },
      { status: 400 }
    );
  }

  try {
    const buffetData = await req.json();

    const { title, description, cookPrice, category, dishes, discounts, perPlate } = buffetData;

    if (!title || !description || !cookPrice || !category || !dishes || !discounts || !perPlate) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate discounts structure
    const requiredDiscountKeys = ["50", "100", "200", "500", "1000"];
    for (const key of requiredDiscountKeys) {
      if (typeof discounts[key] !== "string") {
        return NextResponse.json(
          { message: `Discount for ${key} guests must be a string.` },
          { status: 400 }
        );
      }
    }

    const buffet = await Buffet.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        cookPrice,
        category,
        dishes,
        discounts,
        perPlate,
      },
      { new: true, runValidators: true }
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

    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to update buffet. Please try again." },
      { status: 500 }
    );
  }
}
