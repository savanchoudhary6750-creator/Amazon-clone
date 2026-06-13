import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 * Creates a signed JWT token with user information
 */
export const generateToken = (userId, role = "user") => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

/**
 * Verify JWT Token
 * Verifies and decodes a JWT token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    throw new Error("Invalid token");
  }
};

/**
 * Decode Token without verification
 * Useful for debugging and getting token information
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
