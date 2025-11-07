import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    facebookASK: {
      type: String,
      required: [true, "Facebook follow confirmation is required"],
      trim: true,
    },
    instagramASK: {
      type: String,
      required: [true, "Instagram follow confirmation is required"],
      trim: true,
    },
    instagramHandle: {
      type: String,
      required: [true, "Instagram handle is required"],
      trim: true,
    },
    facebookProfile: {
      type: String,
      required: [true, "Facebook profile is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // TTL index - 24 hours
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;