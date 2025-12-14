import mongoose from "mongoose";

const donorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    lastDonationDate: {
      type: Date
    },
    isEligible: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DonorProfile", donorProfileSchema);
