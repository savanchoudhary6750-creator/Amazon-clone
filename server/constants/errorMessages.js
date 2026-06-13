/**
 * Error Messages
 * Consistent error messages across the application
 */
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_ALREADY_EXISTS: "User with this email already exists",
  USER_NOT_FOUND: "User not found",
  TOKEN_EXPIRED: "Token has expired. Please login again",
  INVALID_TOKEN: "Invalid or malformed token",
  UNAUTHORIZED: "You are not authorized to perform this action",

  // Validation
  INVALID_EMAIL: "Please provide a valid email address",
  INVALID_PASSWORD: "Password must be at least 6 characters",
  MISSING_FIELDS: "Please provide all required fields",

  // Products
  PRODUCT_NOT_FOUND: "Product not found",
  INVALID_PRODUCT_DATA: "Invalid product data",

  // Cart
  CART_EMPTY: "Your cart is empty",
  ITEM_NOT_IN_CART: "Item not found in cart",

  // Orders
  ORDER_NOT_FOUND: "Order not found",
  INVALID_ORDER_DATA: "Invalid order data",

  // General
  INTERNAL_ERROR: "Internal server error. Please try again later",
  INVALID_REQUEST: "Invalid request",
};
