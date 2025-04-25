import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST() {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_FOR) {
      throw new Error("Email configuration is missing in environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
      secure: true, 
    });

    // Verify connection configuration
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Test Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_FOR,
      subject: "Test Email from Next.js",
      text: "Hello! This is a test email sent from Next.js server route.",
    });

    console.log("Mail sent: ", info.messageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending mail:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        suggestion: "Check your Gmail account settings and ensure you're using an App Password if 2FA is enabled"
      }, 
      { status: 500 }
    );
  }
}