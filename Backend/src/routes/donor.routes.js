import express from "express";
import { createDonorProfile, donateBlood } from "../controllers/donor.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", protect, authorizeRoles("DONOR"), createDonorProfile);

router.post("/donate", protect, authorizeRoles("DONOR"), donateBlood);

export default router;
