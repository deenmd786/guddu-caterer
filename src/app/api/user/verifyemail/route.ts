
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

const verifyUserHandler = async (req: NextRequest) => {
  const reqBody = await req.json();
  const { token } = reqBody;
  console.log("token ", token);

  // Find the user based on the token
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });

  // Handle case where the user doesn't exist or the token is invalid
  if (!user) {
    return NextResponse.json({ error: authMessages.invalidCreadencials }, { status: 500 });
  }

  // If the user is already verified, return a different message
  if (user.isVerified) {
    return NextResponse.json(
      { message: authMessages.alreadyVerified, success: true },
      { status: 200 }
    );
  }

  // Proceed with verification if the user is not verified yet
  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  await user.save();

  return NextResponse.json(
    { message: authMessages.verificationSuccess, success: true },
    { status: 201 }
  );
};

// Export the handler wrapped with error handling
export const POST = withErrorHandler(verifyUserHandler);
