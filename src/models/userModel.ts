import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true, // Use email as the unique identifier
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  description: {
    type: String,
    default: "Please provide a brief description about yourself.",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "GENERAL",
  },
  profilePic: {
    type: String,
    required: [true, "Please provide profile pic"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
}, { timestamps: true });

// Use the existing model or create a new one
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
