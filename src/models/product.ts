import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: { type: String, required: true, unique: true },
    cookingMethods: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    region: { type: String, required: true },
    productImg: { type: [String], required: true },
  },
  { timestamps: true }
);

// Create the Product model, ensuring it only creates once
const Product = mongoose.models.Product || model("Product", ProductSchema);

export default Product;