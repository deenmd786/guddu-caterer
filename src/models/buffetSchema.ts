import mongoose, { Schema, model } from "mongoose";
import { IBuffetData } from "@/types/buffetTypes";

// Define the Mongoose schema
const buffetSchema = new Schema<IBuffetData>(
  {
    title: { type: String, required: true, trim: true , unique: true},
    description: { type: String, required: true, trim: true },
    cookPrice: { type: String, required: true, trim:true},
    category: {
      type: String,
      enum: ["wedding", "birthday", "corporate", "festival", "anniversary", "casual party"],
      required: true,
    },
    dishes: {
      type: Map,
      of: [{ title: String, imageUrl: String }],
      required: true,
      validate: {
        validator: function (value: Map<string, { title: string; imageUrl: string }[]>) {
          // Ensure at least one entry exists in the dishes map
          return value && value.size > 0;
        },
        message: "Dishes must contain at least one item.",
      },
    },
    
    discounts: {
      50: { type: String, required: true },
      100: { type: String, required: true },
      200: { type: String, required: true },
      500: { type: String, required: true },
      1000: { type: String, required: true },
      2000: { type: String, required: true },
    },
    perPlate: { type: String, required: true, trim: true},
  },
  { timestamps: true }
);

// Create and export the Buffet model
const Buffet = mongoose.models.Buffet || model<IBuffetData>("Buffet", buffetSchema);
export default Buffet;