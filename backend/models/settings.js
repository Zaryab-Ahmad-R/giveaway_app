import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    registrationEnabled: {
      type: Boolean,
      default: true,
    },
    blockStart: {
      type: String, // "21:30"
      default: "21:30",
    },
    blockEnd: {
      type: String, // "23:30"
      default: "23:30",
    },
    timezoneOffset: {
      type: Number,
      default: 5, // Pakistan (UTC+5)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
