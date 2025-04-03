import mongoose, { Schema, model } from "mongoose";
import { IBuffetData } from "@/types/buffetTypes";

// Define the Mongoose schema
const buffetSchema = new Schema<IBuffetData>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    cookPrice: { type: Number, required: true, min: [0, "Minimum price cannot be negative"] },
    category: {
      type: String,
      enum: ["Wedding", "Birthday", "Corporate", "Festival", "Anniversary", "Casual Party"],
      required: true,
    },
    dishes: {
      type: Map,
      of: [{ title: String, imageUrl: String }],
      required: true,
    },
    prices: {
      50: { type: Number, required: true },
      100: { type: Number, required: true },
      200: { type: Number, required: true },
      500: { type: Number, required: true },
      1000: { type: Number, required: true },
    },
    offer: { type: String, required: true, trim: true},
  },
  { timestamps: true }
);

// Create and export the Buffet model
const Buffet = mongoose.models.Buffet || model<IBuffetData>("Buffet", buffetSchema);
export default Buffet;