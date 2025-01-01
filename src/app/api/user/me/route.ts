import { getDataFromToken } from "@/helpers/getToken";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

const registerUserHandler = async (req: NextRequest) => {
    const userId = getDataFromToken(req);
    
    // Ensure userId is valid
    if (!userId) {
        return NextResponse.json({ error: authMessages.invalidCreadencials }, { status: 401 });
    }

    try {
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return NextResponse.json({ error: authMessages.userNotFound }, { status: 404 });
        }
        return NextResponse.json({ message: authMessages.userFoundSuccess, user }, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }else{
            throw new Error(authMessages.unknownError);
        }
    }
};

export const POST = withErrorHandler(registerUserHandler);
