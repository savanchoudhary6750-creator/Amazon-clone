import bcrypt from "bcryptjs";

/**
 * Hash Password
 * Hashes a plain text password using bcrypt with salt
 */
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compare Passwords
 * Compares a plain text password with a hashed password
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
