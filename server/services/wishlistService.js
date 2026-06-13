import wishlistRepository from "../repositories/wishlistRepository.js";
import productRepository from "../repositories/productRepository.js";
import { ApiError } from "../utils/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Wishlist Service
 * Handles wishlist operations
 */
export class WishlistService {
  /**
   * Get User Wishlist
   */
  async getWishlist(userId) {
    let wishlist = await wishlistRepository.findOneByUserId(userId);

    if (!wishlist) {
      wishlist = await wishlistRepository.create({ userId, products: [] });
    }

    return wishlist;
  }

  /**
   * Add Product to Wishlist
   */
  async addToWishlist(userId, productId) {
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    let wishlist = await wishlistRepository.findOneByUserId(userId, false);

    if (!wishlist) {
      wishlist = await wishlistRepository.create({ userId, products: [] });
    }

    // Check if already in wishlist
    const exists = wishlist.products.some(
      (p) => p.productId.toString() === productId
    );

    if (exists) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Product already in wishlist"
      );
    }

    wishlist.products.push({ productId });
    wishlist.totalItems = wishlist.products.length;

    await wishlistRepository.save(wishlist);
    return wishlist;
  }

  /**
   * Remove Product from Wishlist
   */
  async removeFromWishlist(userId, productId) {
    let wishlist = await wishlistRepository.findOneByUserId(userId, false);

    if (!wishlist) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Wishlist not found"
      );
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.productId.toString() !== productId
    );

    wishlist.totalItems = wishlist.products.length;

    await wishlistRepository.save(wishlist);
    return wishlist;
  }

  /**
   * Clear Wishlist
   */
  async clearWishlist(userId) {
    let wishlist = await wishlistRepository.findOneByUserId(userId, false);

    if (!wishlist) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Wishlist not found"
      );
    }

    wishlist.products = [];
    wishlist.totalItems = 0;

    await wishlistRepository.save(wishlist);
    return wishlist;
  }

  /**
   * Check if Product in Wishlist
   */
  async isInWishlist(userId, productId) {
    const wishlist = await wishlistRepository.findOneByUserId(userId, false);

    if (!wishlist) return false;

    return wishlist.products.some(
      (p) => p.productId.toString() === productId
    );
  }
}

export default new WishlistService();
