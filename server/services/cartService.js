import cartRepository from "../repositories/cartRepository.js";
import productRepository from "../repositories/productRepository.js";
import { ApiError } from "../utils/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Cart Service
 * Handles shopping cart operations
 */
export class CartService {
  /**
   * Get User Cart
   */
  async getCart(userId) {
    let cart = await cartRepository.findOneByUserId(userId);

    if (!cart) {
      cart = await cartRepository.create({ userId, items: [] });
    }

    return cart;
  }

  /**
   * Add Item to Cart
   */
  async addToCart(userId, productId, quantity = 1) {
    const product = await productRepository.findById(productId);

    if (!product || !product.isActive) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    if (product.stock < quantity) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Insufficient stock available"
      );
    }

    let cart = await cartRepository.findOneByUserId(userId, false);

    if (!cart) {
      cart = await cartRepository.create({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        discount: product.discount,
      });
    }

    // Recalculate totals
    await this.updateCartTotals(cart);
    await cartRepository.save(cart);

    // Populate product details before returning
    cart = await cartRepository.findOneByUserId(userId);

    return cart;
  }

  /**
   * Update Cart Item Quantity
   */
  async updateQuantity(userId, productId, quantity) {
    if (quantity < 1) {
      return this.removeFromCart(userId, productId);
    }

    const product = await productRepository.findById(productId);
    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND
      );
    }

    if (product.stock < quantity) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Insufficient stock available"
      );
    }

    let cart = await cartRepository.findOneByUserId(userId, false);

    if (!cart) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CART_EMPTY);
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ITEM_NOT_IN_CART
      );
    }

    item.quantity = quantity;

    await this.updateCartTotals(cart);
    await cartRepository.save(cart);

    // Populate product details before returning
    cart = await cartRepository.findOneByUserId(userId);

    return cart;
  }

  /**
   * Remove Item from Cart
   */
  async removeFromCart(userId, productId) {
    let cart = await cartRepository.findOneByUserId(userId, false);

    if (!cart) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CART_EMPTY);
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await this.updateCartTotals(cart);
    await cartRepository.save(cart);

    // Populate product details before returning
    cart = await cartRepository.findOneByUserId(userId);

    return cart;
  }

  /**
   * Clear Cart
   */
  async clearCart(userId) {
    let cart = await cartRepository.findOneByUserId(userId, false);

    if (!cart) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CART_EMPTY);
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    cart.totalDiscount = 0;
    cart.tax = 0;
    cart.shippingCost = 0;
    cart.finalPrice = 0;

    await cartRepository.save(cart);

    // Populate product details before returning
    cart = await cartRepository.findOneByUserId(userId);

    return cart;
  }

  /**
   * Update Cart Totals
   * Recalculates all cart totals
   */
  async updateCartTotals(cart) {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalItems = 0;

    cart.items.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
      totalDiscount += (item.discount || 0) * item.quantity;
    });

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    cart.totalDiscount = totalDiscount;
    
    // Calculate tax (assuming 5% tax)
    const taxableAmount = totalPrice - totalDiscount;
    cart.tax = Math.round(taxableAmount * 0.05 * 100) / 100;
    
    // Shipping cost (free for orders > 500)
    cart.shippingCost = taxableAmount > 500 ? 0 : 40;
    
    // Final price
    cart.finalPrice = taxableAmount + cart.tax + cart.shippingCost;

    return cart;
  }

  /**
   * Apply Coupon Code (Future Implementation)
   */
  async applyCoupon(userId, couponCode) {
    const cart = await cartRepository.findOneByUserId(userId);
    return cart;
  }
}

export default new CartService();
