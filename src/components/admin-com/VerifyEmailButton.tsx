import React from 'react';

interface VerifyEmailButtonProps {
  email: string;
  initialEmail: string;
  isVerified: boolean | undefined;
  onVerify: () => void;
}

const VerifyEmailButton: React.FC<VerifyEmailButtonProps> = ({ email, initialEmail, isVerified, onVerify }) => {
  const isEmailChanged = email !== initialEmail;

  return (
    <button
      onClick={onVerify}
      disabled={isEmailChanged || isVerified}
      className={`w-full py-2 font-semibold rounded-md transition-colors ${
        isVerified ? "bg-green-500 text-white opacity-50 cursor-not-allowed" : 
        isEmailChanged ? "bg-blue-500 text-white opacity-50 cursor-not-allowed" : 
        "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isVerified ? "Verified" : "Verify Email"}
    </button>
  );
};

export default VerifyEmailButton;
