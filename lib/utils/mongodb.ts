import mongoose from "mongoose";

let isConnected = false;

export const mongodb = async () => {
  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    const URL = process.env.MONGODB_URL;
    await mongoose.connect(URL);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
