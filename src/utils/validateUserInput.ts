import authMessages from "./authMessages";

export function validateSignupInput(
  name: string,
  email: string,
  password: string,
  profilePic?: string,
): string | null {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegex = /^.{3,20}$/;
  const passwordMinLength = 6;

  // Regex for base64 image strings
  const base64ImageRegex = /^data:image\/(jpeg|png|gif);base64,[A-Za-z0-9+/=]+$/;

  // Validate name
  if (!name || !nameRegex.test(name)) {
    return authMessages.invalidNameFormat;
  }

  // Validate email
  if (!email || !emailRegex.test(email)) {
    return authMessages.invalidEmailFormat;
  }

  // Validate password
  if (!password || password.length < passwordMinLength) {
    return authMessages.passwordTooShort;
  }

  // Validate profile picture (optional)
  if (profilePic && !base64ImageRegex.test(profilePic)) {
    return authMessages.invalidProfilePicUrl;
  }

  // If all validations pass
  return null;
}

export function validateLoginInput(email: string, password: string): string | null {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordMinLength = 6; // Ensure consistency with signup

  // Validate email
  if (!email || !emailRegex.test(email)) {
    return authMessages.invalidEmailFormat;
  }

  // Validate password
  if (!password || password.length < passwordMinLength) {
    return authMessages.passwordTooShort;
  }

  // If all validations pass
  return null;
}
