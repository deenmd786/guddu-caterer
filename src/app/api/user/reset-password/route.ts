import User from "../../../../models/userModel";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT verification
import { NextRequest, NextResponse } from "next/server";
import authMessages from "../../../../utils/authMessages";
import { withErrorHandler } from "../../../../utils/withErrorHandler";
import dbConnect from "../../../../lib/dbConnect";
import bcrypt from "bcryptjs"

dbConnect();

const resetPasswordHandler = async (req: NextRequest) => {
  try {
    const { token, userId, newPassword } = await req.json();

    // Validate input
    if (!token) {
      return NextResponse.json({ error: "Token is not available" }, { status: 400 });
    }
    if (!userId) {
      return NextResponse.json({ error: "User ID is not available" }, { status: 400 });
    }
    if (!newPassword) {
      return NextResponse.json({ error: "New password is not available" }, { status: 400 });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: authMessages.userNotFound }, { status: 404 });
    }

    // Verify the JWT token and check expiration
    try {
      // Decode the token and verify its validity using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      
      // Ensure the token matches the userId
      if (decoded.userId !== userId) {
        return NextResponse.json({ error: authMessages.invalidToken }, { status: 400 });
      }

      // Check if the token has expired
      if (user.forgotPasswordTokenExpiry < Date.now()) {
        return NextResponse.json({ error: authMessages.invalidOrExpiredToken }, { status: 400 });
      }

    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: authMessages.invalidOrExpiredToken }, { status: 400 });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user record with the new password and clear the token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: authMessages.passwordResetSuccess, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    const errorMessage = error instanceof Error ? error.message : authMessages.unknownError;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

export const POST = withErrorHandler(resetPasswordHandler);
