import authService from "../services/authService.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../validators/index.js";

/**
 * Authentication Controller
 * Handles user authentication endpoints
 */

export const register = asyncHandler(async (req, res) => {
  // Validate input
  const validation = validateUserRegistration(req.body);
  if (!validation.isValid) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      null,
      validation.errors
    );
  }

  const { user, token } = await authService.registerUser(req.body);

  return sendResponse(res, HTTP_STATUS.CREATED, "User registered successfully", {
    user,
    token,
  });
});

export const login = asyncHandler(async (req, res) => {
  // Validate input
  const validation = validateUserLogin(req.body);
  if (!validation.isValid) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      null,
      validation.errors
    );
  }

  const { user, token } = await authService.loginUser(
    req.body.email,
    req.body.password
  );

  return sendResponse(res, HTTP_STATUS.OK, "Login successful", {
    user,
    token,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, "Profile fetched successfully", user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateUserProfile(req.user.id, req.body);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Profile updated successfully",
    user
  );
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Old password and new password are required"
    );
  }

  const result = await authService.changePassword(
    req.user.id,
    oldPassword,
    newPassword
  );

  return sendResponse(res, HTTP_STATUS.OK, result.message);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const result = await authService.deleteAccount(req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, result.message);
});

export const logout = asyncHandler(async (req, res) => {
  // Client-side should clear the token
  return sendResponse(res, HTTP_STATUS.OK, "Logout successful");
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await authService.getAllUsers();
  return sendResponse(res, HTTP_STATUS.OK, "Users fetched successfully", users);
});
