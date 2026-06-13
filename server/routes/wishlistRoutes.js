import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * All wishlist routes require authentication
 */
router.use(protect);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/:productId", removeFromWishlist);
router.delete("/", clearWishlist);
router.get("/check/:productId", isInWishlist);

export default router;
