import { getDataFromToken } from "@/helpers/getToken";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


// TypeScript interface for the request body
interface UpdateUserRequestBody {
  name?: string;
  profilePic?: string;
  description?: string;
}

export const PUT = async (req: NextRequest) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get the user ID from the token
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: "Invalid or missing token." }, { status: 401 });
    }

    // Parse the request body
    const body: UpdateUserRequestBody = await req.json();
    const { name, profilePic, description } = body;

    // Validate at least one field is present for update
    if (!name && !profilePic && !description) {
      return NextResponse.json(
        { message: "At least one field (name, profilePic, description) must be provided for update." },
        { status: 400 }
      );
    }

    // Prepare the update payload
    const payload: Partial<UpdateUserRequestBody> = {
      ...(name && { name }),
      ...(profilePic && { profilePic }),
      ...(description && { description }),
    };

    // Update the user data
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update user." }, { status: 500 });
    }

    // Return the updated user
    return NextResponse.json(
      {
        data: updatedUser,
        message: "User updated successfully.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
  }
};
