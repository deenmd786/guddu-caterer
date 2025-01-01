import { dbConnect } from "@/lib/dbConnect";
import authMessages from "@/utils/authMessages";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { NextResponse } from "next/server";

// Connect to the database
dbConnect();

// Logout handler function
const logoutHandler = async () => {
    // Prepare the response
    const response = NextResponse.json({
        message: authMessages.logoutSuccess,
        success: true,
    });

    // Set cookie options separately (if needed)
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag for production
        path: "/", // Ensure it applies to all paths
        expires: new Date(0), // Set an expiration date in the past to effectively delete it
    });

    // Return the response
    return response;
};

// Export the GET handler, wrapped with error handling
export const GET = withErrorHandler(logoutHandler);