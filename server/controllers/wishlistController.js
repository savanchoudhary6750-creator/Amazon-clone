import wishlistService from "../services/wishlistService.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Wishlist Controller
 * Handles wishlist endpoints
 */

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user.id);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Wishlist fetched successfully",
    wishlist
  );
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Product ID is required"
    );
  }

  const wishlist = await wishlistService.addToWishlist(
    req.user.id,
    productId
  );

  return sendResponse(
    res,
    HTTP_STATUS.CREATED,
    "Product added to wishlist",
    wishlist
  );
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const wishlist = await wishlistService.removeFromWishlist(
    req.user.id,
    productId
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Product removed from wishlist",
    wishlist
  );
});

export const clearWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.clearWishlist(req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, "Wishlist cleared", wishlist);
});

export const isInWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const inWishlist = await wishlistService.isInWishlist(
    req.user.id,
    productId
  );

  return sendResponse(res, HTTP_STATUS.OK, "Wishlist check complete", {
    inWishlist,
  });
});
