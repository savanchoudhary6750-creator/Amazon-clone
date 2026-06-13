/**
 * User Roles
 * Defines role-based access control constants
 */
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SELLER: "seller",
};

export const ROLE_PERMISSIONS = {
  ADMIN: ["manage_users", "manage_products", "manage_orders", "view_analytics"],
  USER: ["view_products", "create_order", "manage_cart", "manage_wishlist"],
  SELLER: ["create_products", "manage_products", "view_orders"],
};
