import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Validate Email Format
 * Uses regex to validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Password Strength
 * Requires minimum 6 characters
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate User Registration
 * Validates all required fields for registration
 */
export const validateUserRegistration = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!validatePassword(data.password)) {
    errors.password = ERROR_MESSAGES.INVALID_PASSWORD;
  }

  if (data.phone && !/^\d{10}$/.test(data.phone.replace(/\D/g, ""))) {
    errors.phone = "Invalid phone number format";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate User Login
 * Validates email and password
 */
export const validateUserLogin = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Product Data
 * Validates product information for create/update
 */
export const validateProduct = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = "Product name is required";
  }

  if (!data.description?.trim()) {
    errors.description = "Product description is required";
  }

  if (!data.price || data.price <= 0) {
    errors.price = "Product price must be greater than 0";
  }

  if (!data.category?.trim()) {
    errors.category = "Product category is required";
  }

  if (!data.stock || data.stock < 0) {
    errors.stock = "Product stock cannot be negative";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
