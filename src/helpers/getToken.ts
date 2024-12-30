import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import authMessages from "../utils/authMessages";

interface DecodedToken extends JwtPayload {
    id: string; 
}

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        
        if (!token) {
            throw new Error(authMessages.tokenNotExist); // Handle missing token
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

        const userId = decoded.id;

        return userId;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message); 
        } else {
            throw new Error(authMessages.unknownError);
        }
    }
};
