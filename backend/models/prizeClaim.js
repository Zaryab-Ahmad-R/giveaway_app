import mongoose from "mongoose";

const prizeClaimSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      trim: true,
    },
    iban: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // TTL index (24 hours)
    },
  },
  { timestamps: true }
);

const PrizeClaim = mongoose.model("PrizeClaim", prizeClaimSchema);
export default PrizeClaim;
