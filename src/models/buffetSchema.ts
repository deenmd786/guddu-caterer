import { IBuffetData } from "@/types/buffetTypes";
import mongoose, { Schema, model } from "mongoose";

// Define interfaces for buffet data
export interface IItem {
  title: string;
  imageUrl: string;
}

// Buffet schema definition
const buffetSchema = new Schema<IBuffetData>({
  title: { type: String, required: true, trim: true },
  cookPrice: { type: Number, required: true, min: [0, "Minimum price cannot be negative"] },
  minPrice: { type: Number, required: true, min: [0, "Minimum price cannot be negative"] },
  maxPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value >= this.minPrice; // maxPrice must be >= minPrice
      },
      message: "Maximum price must be greater than or equal to the minimum price",
    },
  },
  gatheringSize: { 
    type: String, 
    enum: ["small", "medium", "large"], // Valid values
    default: "small", // Default value set to "small"
    required: true 
  },
  categories: {
    type: Object, // Use Object to store key-value pairs
    required: true,
  },
});

// Create and export the Buffet model
const Buffet = mongoose.models.Buffet || model<IBuffetData>("Buffet", buffetSchema);
export default Buffet;