import express from "express";
import { getInventorySummary } from "../controllers/inventory.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", protect, authorizeRoles("ADMIN"), getInventorySummary);

export default router;
