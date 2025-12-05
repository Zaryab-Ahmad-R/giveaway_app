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
    // facebookASK: {
    //   type: String,
    //   required: [true, "Facebook follow confirmation is required"],
    //   trim: true,
    // },
    // facebookPost: {
    //   type: String,
    //   required: [true, "Facebook post confirmation is required"],
    //   trim: true,
    // },
    // friendsAskF: {
    //   type: String,
    //   required: [true, "Friends confirmation is required"],
    //   trim: true,
    // },
    // sharePostF: {
    //   type: String,
    //   required: [true, "Post confirmation is required"],
    //   trim: true,
    // },
    // instagramASK: {
    //   type: String,
    //   required: [true, "Instagram follow confirmation is required"],
    //   trim: true,
    // },
    // instagramPost: {
    //   type: String,
    //   required: [true, "Instagram post confirmation is required"],
    //   trim: true,
    // },
    // friendsAskI: {
    //   type: String,
    //   required: [true, "Friends confirmation is required"],
    //   trim: true,
    // },
    // sharePostI: {
    //   type: String,
    //   required: [true, "Share confirmation is required"],
    //   trim: true,
    // },
    tiktokProfile: {
      type: String,
      required: [true, "Tiktok profile is required"],
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