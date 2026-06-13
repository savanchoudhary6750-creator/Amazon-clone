import userRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { ApiError } from "../utils/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Authentication Service
 * Handles user registration, login, and account management
 */
export class AuthService {
  /**
   * Register User
   * Creates a new user account with encrypted password
   */
  async registerUser(userData) {
    const { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGES.USER_ALREADY_EXISTS
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Assign admin role if email matches ADMIN_EMAIL
    const role = email.toLowerCase() === (process.env.ADMIN_EMAIL || "admin@amazon-clone-root.com").toLowerCase() ? "admin" : "user";

    // Create user
    const user = await userRepository.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    return {
      user: user.toJSON(),
      token,
    };
  }

  /**
   * Login User
   * Authenticates user and returns JWT token
   */
  async loginUser(email, password) {
    // Find user by email with password field
    const user = await userRepository.findByEmail(email, true);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    return {
      user: user.toJSON(),
      token,
    };
  }

  /**
   * Get User Profile
   * Fetches complete user information
   */
  async getUserProfile(userId) {
    const user = await userRepository.findByIdWithWishlist(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Update User Profile
   * Updates user information
   */
  async updateUserProfile(userId, updateData) {
    const allowedFields = [
      "firstName",
      "lastName",
      "phone",
      "profileImage",
      "address",
    ];

    // Filter allowed fields
    const filteredData = {};
    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    });

    const user = await userRepository.updateById(userId, filteredData);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  /**
   * Change Password
   * Allows user to change their password
   */
  async changePassword(userId, oldPassword, newPassword) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Since we need password field which is selected false by default, we re-query with selectPassword = true
    const userWithPassword = await userRepository.findByEmail(user.email, true);

    // Verify old password
    const isPasswordValid = await comparePassword(oldPassword, userWithPassword.password);
    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Current password is incorrect"
      );
    }

    // Hash and set new password
    userWithPassword.password = await hashPassword(newPassword);
    await userWithPassword.save();

    return { message: "Password changed successfully" };
  }

  /**
   * Delete User Account
   * Soft delete - marks account as inactive
   */
  async deleteAccount(userId) {
    const user = await userRepository.updateById(userId, { isActive: false });

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return { message: "Account deleted successfully" };
  }

  async getAllUsers() {
    return userRepository.findAll();
  }
}

export default new AuthService();
