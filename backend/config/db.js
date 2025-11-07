import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI not set in environment");
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log("✅ Atlas connected");
  } catch (err) {
    console.error("❌ Atlas connection failed:", err.message);
    process.exit(1);
  }
};
