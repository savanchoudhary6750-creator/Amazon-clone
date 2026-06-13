import cartService from "../services/cartService.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Cart Controller
 * Handles shopping cart endpoints
 */

export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, "Cart fetched successfully", cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Product ID is required"
    );
  }

  const cart = await cartService.addToCart(req.user.id, productId, quantity);

  return sendResponse(
    res,
    HTTP_STATUS.CREATED,
    "Item added to cart",
    cart
  );
});

export const updateQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Product ID and quantity are required"
    );
  }

  const cart = await cartService.updateQuantity(
    req.user.id,
    productId,
    quantity
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Cart updated successfully",
    cart
  );
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await cartService.removeFromCart(req.user.id, productId);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Item removed from cart",
    cart
  );
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, "Cart cleared", cart);
});
