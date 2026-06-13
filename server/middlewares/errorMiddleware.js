import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import logger from "../logger/logger.js";

/**
 * Global Error Handling Middleware
 * Catches and formats all errors in a consistent way
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";

  logger.error(`Error: ${message}`, {
    statusCode,
    url: req.originalUrl,
    method: req.method,
    errors: err.errors,
    stack: err.stack,
  });

  return sendResponse(res, statusCode, message, null, err.errors || null);
};

/**
 * 404 Not Found Middleware
 * Handles routes that don't match any endpoint
 */
export const notFoundHandler = (req, res) => {
  return sendResponse(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route ${req.originalUrl} not found`,
    null
  );
};
