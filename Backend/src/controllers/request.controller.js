import bloodRequest from "../models/BloodRequest.model.js";
import BloodUnit from "../models/BloodUnit.model.js";

export const createRequest = async (req, res) => {
    try{
        const { bloodGroup, quantity, urgency} = req.body;

    const request = await bloodRequest.create({
        requester: req.user._id,
        bloodGroup,
        quantity,
        urgency,
    });

    res.status(201).json({
        success: true,
        request,
    });
    }
    catch(error){
        res.status(500).json({
            success: false,
            messege: error.messege,
        });
    }
};


export const approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request || request.status !== "PENDING") {
      return res.status(400).json({ message: "Invalid request" });
    }

    let remainingQty = request.quantity;

    const availableUnits = await BloodUnit.find({
      bloodGroup: request.bloodGroup,
      status: "AVAILABLE",
      expiryDate: { $gte: new Date() }
    }).sort({ expiryDate: 1 });

    for (const unit of availableUnits) {
      if (remainingQty <= 0) break;

      if (unit.quantity <= remainingQty) {
        remainingQty -= unit.quantity;
        unit.status = "ALLOCATED";
        await unit.save();
      } else {
        unit.quantity -= remainingQty;
        remainingQty = 0;
        await unit.save();
      }
    }

    if (remainingQty > 0) {
      return res.status(400).json({
        message: "Insufficient stock to fulfill request"
      });
    }

    request.status = "APPROVED";
    await request.save();

    res.json({ message: "Request approved and stock allocated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const rejectRequest = async (req, res) => {
  try {
    const { reason } = req.body;

    const request = await BloodRequest.findById(req.params.id);
    if (!request || request.status !== "PENDING") {
      return res.status(400).json({ message: "Invalid request" });
    }

    request.status = "REJECTED";
    request.rejectionReason = reason;
    await request.save();

    res.json({ message: "Request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
