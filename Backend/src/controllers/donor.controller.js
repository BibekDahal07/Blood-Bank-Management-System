import DonorProfile from "../models/DonorProfile.model.js";
import DonationRecord from "../models/DonationRecord.model.js";

const ELIGIBILITY_DAYS = 90;

export const createDonorProfile = async (req, res) => {
  try {
    const existingProfile = await DonorProfile.findOne({ user: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "Donor profile already exists" });
    }

    const { bloodGroup } = req.body;

    const donorProfile = await DonorProfile.create({
      user: req.user._id,
      bloodGroup
    });

    res.status(201).json(donorProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const donateBlood = async (req, res) => {
  try {
    const donorProfile = await DonorProfile.findOne({ user: req.user._id });
    if (!donorProfile) {
      return res.status(404).json({ message: "Donor profile not found" });
    }

    if (!donorProfile.isEligible) {
      return res.status(400).json({ message: "Donor not eligible to donate" });
    }

    const { quantity } = req.body;

    await DonationRecord.create({
      donor: donorProfile._id,
      quantity
    });

    donorProfile.lastDonationDate = new Date();
    donorProfile.isEligible = false;
    await donorProfile.save();

    res.json({ message: "Blood donated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
