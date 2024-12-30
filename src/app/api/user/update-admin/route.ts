import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";
import dbConnect from "../../../../lib/dbConnect";
import { getDataFromToken } from "../../../../helpers/getToken";

// TypeScript interfaces
interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  role?: string;
  profilePic?: string;
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
    const { name, email, role, profilePic } = body;

    // Validate the presence of at least one field to update
    if (!name && !email && !role && !profilePic) {
      return NextResponse.json(
        { message: "At least one field (name, email, role, profilePic) must be provided for update." },
        { status: 400 }
      );
    }

    // Fetch the user making the request
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Ensure only admins can update the role field
    if (role && currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Access denied. Only admins can update the role." },
        { status: 403 }
      );
    }

    // Prepare the payload for updating
    const payload: Partial<UpdateUserRequestBody> = {
      ...(name && { name }),
      ...(email && { email }),
      ...(profilePic && { profilePic }),
      ...(role && { role }), // This is safe due to the admin check above
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
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
  }
};
