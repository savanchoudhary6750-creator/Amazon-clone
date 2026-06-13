import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  addReview,
  getFeaturedProducts,
  getProductsByCategory,
} from "../controllers/productController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProducts);
router.get("/:id", getProductById);

/**
 * Protected Routes - User
 */
router.post("/:id/reviews", protect, addReview);

/**
 * Protected Routes - Admin/Seller
 */
router.post("/", protect, authorize("admin", "seller"), createProduct);
router.put("/:id", protect, authorize("admin", "seller"), updateProduct);
router.delete("/:id", protect, authorize("admin", "seller"), deleteProduct);

export default router;
