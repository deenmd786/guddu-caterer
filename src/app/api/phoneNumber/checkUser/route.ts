// pages/api/phoneNumbers/checkUser .ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import PhoneNumber from "@/models/phoneModel";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { phoneNumber } = await req.json();
    if (!phoneNumber)
      return NextResponse.json(
        { message: "Phone number is required." },
        { status: 400 }
      );

    const exists = await PhoneNumber.findOne({ phoneNumber });
    if (exists)
      return NextResponse.json(
        { message: "Phone number already exists." },
        {
          status: 200,
        }
      );
    return NextResponse.json(
      { message: "Phone number does not exist." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json(
      { message: "Failed to check user existence." },
      { status: 500 }
    );
  }
}
