import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  requestReturn,
  getAdminOrders,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * All order routes require authentication
 */
router.use(protect);

/**
 * User Routes
 */
router.post("/", createOrder);
router.get("/user/orders", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);
router.post("/:id/return", requestReturn);

/**
 * Admin Routes
 */
router.get("/admin/all", authorize("admin"), getAdminOrders);
router.put("/:id/status", authorize("admin"), updateOrderStatus);
router.put("/:id/payment-status", authorize("admin"), updatePaymentStatus);

export default router;
