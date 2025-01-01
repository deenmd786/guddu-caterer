import { sendEmail } from "@/helpers/mailer";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { validateSignupInput } from "@/utils/validateUserInput";
import { withErrorHandler } from "@/utils/withErrorHandler";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

const registerUserHandler = async (req: NextRequest) => {
  const reqBody = await req.json();
  const { name, email, description, role, password, profilePic } = reqBody;

  // Validate user input
  const validationError = validateSignupInput(name, email, password, profilePic);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 500 });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: authMessages.userAlreadyExists }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const newUser = new User({
    name,
    email,
    description,
    role,
    password: hashedPassword,
    profilePic,
  });
  const savedUser = await newUser.save();
  const userResponse = savedUser.toObject();
  delete userResponse.password;

  console.log(userResponse);

  await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

  return NextResponse.json(
    { message: authMessages.registrationSuccess, success: true, userResponse },
    { status: 201 }
  );
};

export const POST = withErrorHandler(registerUserHandler);
