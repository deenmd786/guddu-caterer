import dbConnect from "../../../../lib/dbConnect";
import Product from "../../../../models/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Adjusted to be a Promise
) {
  try {
    const params = await context.params; // Await the params
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Connected to database. Params: ", params);

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      console.log("Invalid product ID: ", params.id);
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(params.id).select("-__v");

    // If the product is not found
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // Adjusted to be a Promise
) {
  try {
    const params = await context.params; // Await the params
    await dbConnect();
    const productData = await req.json(); // Parse request body

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // Adjusted to be a Promise
) {
  try {
    const params = await context.params; // Await the params
    await dbConnect();
    console.log(`Received DELETE request for product ID: ${params.id}`);

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const result = await Product.deleteOne({ _id: params.id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `Product ${params.id} deleted` });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

