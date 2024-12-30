import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Terminate process if the DB connection fails
  }
};

export default dbConnect;
