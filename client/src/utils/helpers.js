/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

/**
 * Format Price
 */
export const formatPrice = (price, currency = "₹") => {
  return `${currency} ${parseFloat(price).toFixed(2)}`;
};

/**
 * Format Number with Commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Get Discount Percentage
 */
export const getDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Validate Email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate Password
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Truncate Text
 */
export const truncateText = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Get Image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.jpg";
  if (imagePath.startsWith("http")) return imagePath;
  return `${import.meta.env.VITE_API_URL}/${imagePath}`;
};

/**
 * Format Date
 */
export const formatDate = (date, format = "short") => {
  const options = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    full: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Date(date).toLocaleDateString("en-US", options[format] || options.short);
};

/**
 * Format Time Ago
 */
export const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};

/**
 * Get Stars Array
 */
export const getStarsArray = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? "full" : "empty");
};

/**
 * Slugify URL
 */
export const slugify = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Capitalize Text
 */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Handle API Error
 */
export const getErrorMessage = (error) => {
  if (error?.data?.message) return error.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};

/**
 * Clone Object
 */
export const cloneObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge Objects
 */
export const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};
