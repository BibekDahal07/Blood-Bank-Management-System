import mongoose from "mongoose";

const donationRecordSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonorProfile",
      required: true
    },
    donatedAt: {
      type: Date,
      default: Date.now
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DonationRecord", donationRecordSchema);
