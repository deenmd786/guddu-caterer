import mongoose from "mongoose";

const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
    unique: true, // Ensure phone numbers are unique
    match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number."], // Regex for phone number validation
  },
  products: {
    type: [String],
    default: [],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const PhoneNumber = mongoose.models.phoneNumbers || mongoose.model("phoneNumbers", phoneNumberSchema);

export default PhoneNumber;