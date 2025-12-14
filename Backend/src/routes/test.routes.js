import express from "express";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/donor", protect, authorizeRoles("DONOR"), (req, res) => {
  res.json({
    message: "Donor access granted",
    user: req.user,
  });
});

router.get("/admin", protect, authorizeRoles("ADMIN"), (req, res) => {
    res.json({
        message: "Admin access granted",
        user: req.user
    });
});

export default router;
