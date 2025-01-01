import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

dbConnect();

const getAllUsersHandler = async () => {
    try {
        // Fetch all users and exclude passwords
        const users = await User.find().select("-password");

        // Check if there are any users
        if (!users || users.length === 0) {
            return NextResponse.json({ error: authMessages.userNotFound }, { status: 404 });
        }

        // Return the list of users
        return NextResponse.json({ message: authMessages.usersFoundSuccess, users }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(authMessages.unknownError);
        }
    }
};

// Export the GET handler
export const GET = withErrorHandler(getAllUsersHandler);
