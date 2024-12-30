// types/User.ts 

export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    description: string;
    role: string;
    profilePic: string | null;
    isVerified?: boolean;
  }