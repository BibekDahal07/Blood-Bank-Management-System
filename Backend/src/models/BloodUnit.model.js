import mongoose from "mongoose";

const bloodUnitSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    expiryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "ALLOCATED", "EXPIRED"],
      default: "AVAILABLE"
    }
  },
  { timestamps: true }
);

export default mongoose.model("BloodUnit", bloodUnitSchema);
