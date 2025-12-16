import BloodUnit from "../models/BloodUnit.model.js";

export const getInventorySummary = async (req, res) => {
  try {
    const inventory = await BloodUnit.aggregate([
      {
        $match: {
          status: "AVAILABLE",
          expiryDate: { $gte: new Date() },
        },
      },
      {
        $group: {
          _id: "$bloodGroup",
          totalUnits: { $sum: "$quantity" },
        },
      },
    ]);

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
