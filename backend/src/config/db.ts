import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("📦 Using existing MongoDB connection");
    return;
  }

  try {
    const connection = await mongoose.connect(env.MONGO_URI);

    isConnected = connection.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected successfully");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
