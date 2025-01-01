import { sendEmail } from "@/helpers/mailer";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

const forgotPasswordHandler = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    // Validate email input
    if (!email) {
      return NextResponse.json({ error: authMessages.emailRequired }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: authMessages.userNotFound }, { status: 404 });
    }
    

    // Send reset password email
     await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json(
      { message: authMessages.resetLinkSent, success: true },
      { status: 200 }
    );
  } catch (error) {
    // Use type guard to handle unknown error type
    if (error instanceof Error) {
      console.error("Forgot Password Error:", error.message);
      return NextResponse.json(
        { error: error.message || authMessages.unknownError },
        { status: 500 }
      );
    } else {
      console.error("Forgot Password Error:", error);
      return NextResponse.json(
        { error: authMessages.unknownError },
        { status: 500 }
      );
    }
  }
};

export const POST = withErrorHandler(forgotPasswordHandler);
