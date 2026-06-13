import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user information to request
 */
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "No token provided. Authentication required"
      );
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "Token has expired. Please login again"
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid token"
      );
    }
  } catch (error) {
    return sendResponse(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      "Authentication failed"
    );
  }
};

/**
 * Role-Based Authorization Middleware
 * Checks if user has required role(s)
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required"
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendResponse(
        res,
        HTTP_STATUS.FORBIDDEN,
        "You do not have permission to access this resource"
      );
    }

    next();
  };
};

export default protect;
