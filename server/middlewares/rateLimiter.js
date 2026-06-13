import rateLimit from "express-rate-limit";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    sendResponse(
      res,
      HTTP_STATUS.TOO_MANY_REQUESTS,
      "Too many requests from this IP, please try again after 15 minutes"
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    sendResponse(
      res,
      HTTP_STATUS.TOO_MANY_REQUESTS,
      "Too many login/registration attempts from this IP, please try again after 15 minutes"
    );
  },
});
