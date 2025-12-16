import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    urgency: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM"
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "FULFILLED"],
      default: "PENDING"
    },
    rejectionReason: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", bloodRequestSchema);
