"use client";

import React, { useState } from "react";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import Button from "../reuseable/Button";
import { useRouter } from "next/navigation";

const OtpVerify = () => {
  const [otpTimer, setOtpTimer] = useState(60); // Timer for OTP reset
const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend button initially
  const [phoneNumber, setPhoneNumber] = useState("");
  const formattedNumber = "+" + "91" + phoneNumber;
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // New state variable
  const router = useRouter();


  const checkUserVerification = () => {
    const user = auth.currentUser ; // Get the current user
  
    if (user) {
      if (user.phoneNumber) {
        console.log("User  is verified. No need for OTP verification.");
        router.push('/dashboard/book-buffet/booking-form');
        // Proceed with the application logic
      } else {
        console.log("User  is not verified. Proceed with OTP verification.");
        // Trigger OTP verification process
      }
    } else {
      console.log("No user is signed in.");
      // Handle user not signed in
    }
  };

  const captureCode = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response: string) => {
          console.log("Recaptcha verified", response);
        },
        "expired-callback": () => {
          console.error("Recaptcha expired. Please try again.");
        },
      }
    );
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    checkUserVerification();
    if (phoneNumber.length !== 10) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    captureCode();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setSuccess("OTP sent!");
      setIsOtpSent(true); // Set to true after sending OTP
      setIsResendDisabled(false); // Enable resend button
        setOtpTimer(60);

         // Start countdown
         const countdown = setInterval(() => {
          setOtpTimer((prev) => {
              if (prev <= 1) {
                  clearInterval(countdown);
                  setIsResendDisabled(true); // Disable resend button after 1 minute
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);
    } catch (error) {
      console.error("Error during signInWithPhoneNumber", error);
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    try {
      await signInWithCredential(auth, credential);
      setSuccess("Phone number verified successfully!");
      router.push('/dashboard/book-buffet/booking-form');
    } catch (error) {
      console.error("Error verifying OTP", error);
      setMessage("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-[var(--background)]">
      <h2 className="text-xl md:text-2xl text-[var(--text-primary)] font-semibold text-center mb-4">
        Phone Authentication
      </h2>
      
      {/* Show reCAPTCHA only when sending OTP */}
      {!isOtpSent && <div id="recaptcha-container" className="mb-4"></div>}

      {!isOtpSent ? ( // Conditional rendering based on isOtpSent
        <form onSubmit={sendOtp} className="mb-4">
          <div className="flex items-center mb-4">
            <span className="p-2 bg-gray-100 border border-gray-300 rounded-s-lg">
              +91
            </span>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
              }
              required
              maxLength={10}
              className="w-full p-2 border border-gray-300 rounded-r max-sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isOtpSent && (
    <div className="text-center mt-4">
        <button
            onClick={sendOtp}
            disabled={isResendDisabled}
            className={`p-2 border rounded ${isResendDisabled ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        >
            {isResendDisabled ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
        </button>
    </div>
)}
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mb-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            label="Verify OTP"
            className="w-full catr-btn"
          />
        </form>
      )}

      {message && <p className="text-center text-red-500">{message}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}
    </div>
  );
};

export default OtpVerify;