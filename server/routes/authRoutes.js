import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getAllUsers,
} from "../controllers/authController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

/**
 * Public Routes
 */
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

/**
 * Protected Routes
 */
router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/change-password", changePassword);
router.post("/logout", logout);
router.delete("/account", deleteAccount);

// Admin Routes
router.get("/admin/users", authorize("admin"), getAllUsers);

export default router;
