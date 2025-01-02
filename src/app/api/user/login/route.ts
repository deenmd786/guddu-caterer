import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { validateLoginInput } from "@/utils/validateUserInput";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";

dbConnect();

const loginHandler = async (req: NextRequest) => {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Validate user input
    const loginError = validateLoginInput(email, password);
    if (loginError) {
        return NextResponse.json({ error: loginError }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ error: authMessages.incorrectEmail }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
        return NextResponse.json({ error: authMessages.incorrectPassword }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "30d" });

    const response = NextResponse.json({
        message: authMessages.loginSuccess,
        success: true,
        data: user,
    }, { status: 200 });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only set secure in production
        sameSite: "strict", // Adjust based on your needs
    });

    return response;
}

export const POST = withErrorHandler(loginHandler);