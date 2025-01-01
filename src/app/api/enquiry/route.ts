// src/app/api/enquiry/route.ts

import { formMail } from '@/helpers/formMail';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Validate the incoming data
    const formData = await req.json();
    console.log("formData: ", formData);
    

    // Send the enquiry email
    await formMail({
      enquiryData: formData, 
    });

    // Respond with success message
    return NextResponse.json({ message: 'Enquiry submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error("Error processing enquiry:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "An error occurred" }, { status: 500 });
  }
}