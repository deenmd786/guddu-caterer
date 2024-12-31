import User from "../models/userModel";
import nodemailer, { SentMessageInfo } from "nodemailer";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import authMessages from "../utils/authMessages";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams): Promise<SentMessageInfo> => {
  try {
    const TOKEN_EXPIRY_TIME = 3600; // 1 hour (in seconds for JWT)
    
    // Generate the JWT token with expiration time
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: TOKEN_EXPIRY_TIME });

    // Update user record with token (no need to hash, since JWT is self-contained)
    const expiryDate = Date.now() + TOKEN_EXPIRY_TIME * 1000;
    const updateData =
      emailType === "VERIFY"
        ? { verifyToken: token, verifyTokenExpiry: expiryDate }
        : { forgotPasswordToken: token, forgotPasswordTokenExpiry: expiryDate };
    await User.findByIdAndUpdate(userId, { $set: updateData });


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password or App Password
      },
    });





    // Generate the appropriate link
    const actionUrl =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/auth/verifyemail?token=${token}&id=${userId}`
        : `${process.env.DOMAIN}/auth/reset-password?token=${token}&id=${userId}`;

    // Email content
    const mailOptions = {
      from: `"${process.env.MAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Account" : "Reset Your Password",
      html: ` 
        <p>${emailType === "VERIFY"
          ? "Thank you for signing up! Please verify your email by clicking the button below:"
          : "You requested a password reset. Click the button below to reset your password:"}</p>
        <p>
          <a href="${actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
        </p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Mailer Error:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error(authMessages.unknownError);
    }
  }
};
