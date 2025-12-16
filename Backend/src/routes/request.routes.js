import express from "express";
import { createRequest, approveRequest, rejectRequest } from "../controllers/request.controller.js";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post( "/", protect, authorizeRoles("REQUESTER"), createRequest );

router.put( "/:id/approve", protect, authorizeRoles("ADMIN"), approveRequest );

router.put( "/:id/reject", protect, authorizeRoles("ADMIN"), rejectRequest );

export default router;
