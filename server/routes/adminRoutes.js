import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get aggregated dashboard statistics (Admin only)
router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);

export default router;
