import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import { Error as MongooseError } from "mongoose"; // Import Mongoose error type
import Product from "../../../../../models/product";

// Adjust the GET function to accept context with params as a Promise
export async function GET(req: Request, context: { params: Promise<{ subcategory: string }> }) {
  await dbConnect();
  try {
    const { subcategory } = await context.params; // Await the params
    const products = await Product.find({ subcategory }); // Use subcategory in your query
    return NextResponse.json({ products });
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products." }, { status: 500 });
  }
}

// Adjust the POST function to accept context with params as a Promise
export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const productData = await req.json();

    // Validate incoming data
    const { productName, cookingMethods, category, subcategory, region, productImg } = productData;
    if (!productName || !cookingMethods || !category || !subcategory || !region || !productImg) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Check for existing product
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return NextResponse.json(
        { message: "Product with the same name already exists." },
        { status: 400 }
      );
    }

    // Create a new product instance
    const product = new Product({
      productName,
      cookingMethods,
      category,
      subcategory,
      region,
      productImg,
    });

    // Save the product to the database
    await product.save();

    return NextResponse.json({ message: "Product added", product });
  } catch (error: unknown) {
    console.error("Error adding product:", error);
    
    // Handle validation errors from Mongoose
    if (error instanceof MongooseError.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Handle duplicate key errors (if applicable)
    if (error instanceof MongooseError && error.name === "MongoError") {
      return NextResponse.json({ message: "Product with the same name already exists." }, { status: 400 });
    }

    return NextResponse.json({ message: "Failed to add product. Please try again." }, { status: 500 });
  }
}