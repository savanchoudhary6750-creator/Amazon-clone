import orderRepository from "../repositories/orderRepository.js";
import cartRepository from "../repositories/cartRepository.js";
import productRepository from "../repositories/productRepository.js";
import { ApiError } from "../utils/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

/**
 * Order Service
 * Handles order creation and management
 */
export class OrderService {
  /**
   * Create Order from Cart
   */
  async createOrder(userId, orderData) {
    const cart = await cartRepository.findOneByUserId(userId, true);

    if (!cart || cart.items.length === 0) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CART_EMPTY);
    }

    // Verify stock availability
    for (const item of cart.items) {
      if (item.productId.stock < item.quantity) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          `Insufficient stock for ${item.productId.name}`
        );
      }
    }

    // Create order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.name,
      price: item.price,
      quantity: item.quantity,
      discount: item.discount,
      totalPrice: item.price * item.quantity,
    }));

    // Create order
    const order = await orderRepository.create({
      userId,
      items: orderItems,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress || orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      subTotal: cart.totalPrice,
      tax: cart.tax,
      shippingCost: cart.shippingCost,
      discount: cart.totalDiscount,
      totalAmount: cart.finalPrice,
      statusHistory: [
        {
          status: "pending",
          note: "Order created",
        },
      ],
    });

    // Reduce product stock
    for (const item of cart.items) {
      await productRepository.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity, purchaseCount: 1 } }
      );
    }

    // Clear cart
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    cart.totalDiscount = 0;
    cart.tax = 0;
    cart.shippingCost = 0;
    cart.finalPrice = 0;
    await cartRepository.save(cart);

    return order;
  }

  /**
   * Get Order by ID
   */
  async getOrderById(orderId, userId) {
    const order = await orderRepository.findById(orderId, [
      { path: "items.productId", select: "name thumbnail price" }
    ]);

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    // Verify ownership
    if (order.userId.toString() !== userId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.UNAUTHORIZED
      );
    }

    return order;
  }

  /**
   * Get User Orders
   */
  async getUserOrders(userId, filters = {}) {
    const { page = 1, limit = 10, status } = filters;

    const query = { userId };
    if (status) {
      query.orderStatus = status;
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      orderRepository.find(query, {
        populateOptions: [{ path: "items.productId", select: "name thumbnail" }],
        sort: { createdAt: -1 },
        skip,
        limit: limitNum,
      }),
      orderRepository.count(query),
    ]);

    return {
      orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    };
  }

  /**
   * Update Order Status (Admin)
   */
  async updateOrderStatus(orderId, newStatus, note = "") {
    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(newStatus)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid order status");
    }

    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    order.orderStatus = newStatus;
    order.statusHistory.push({
      status: newStatus,
      note: note || `Order ${newStatus}`,
    });

    // Update estimated delivery
    if (newStatus === "shipped") {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      order.estimatedDelivery = deliveryDate;
    }

    if (newStatus === "delivered") {
      order.estimatedDelivery = new Date();
    }

    await orderRepository.save(order);
    return order;
  }

  /**
   * Update Payment Status (Admin/Payment Gateway)
   */
  async updatePaymentStatus(orderId, paymentStatus, transactionId = "") {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    order.paymentStatus = paymentStatus;
    if (transactionId) {
      order.transactionId = transactionId;
    }

    if (paymentStatus === "completed" && order.orderStatus === "pending") {
      order.orderStatus = "confirmed";
    }

    await orderRepository.save(order);
    return order;
  }

  /**
   * Cancel Order
   */
  async cancelOrder(orderId, userId) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    if (order.userId.toString() !== userId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.UNAUTHORIZED
      );
    }

    if (
      !["pending", "confirmed"].includes(order.orderStatus)
    ) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Cannot cancel order in current status"
      );
    }

    // Restore stock
    for (const item of order.items) {
      await productRepository.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } }
      );
    }

    order.orderStatus = "cancelled";
    order.statusHistory.push({
      status: "cancelled",
      note: "Order cancelled by user",
    });

    await orderRepository.save(order);
    return order;
  }

  /**
   * Request Return
   */
  async requestReturn(orderId, userId, reason) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ORDER_NOT_FOUND);
    }

    if (order.userId.toString() !== userId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_MESSAGES.UNAUTHORIZED
      );
    }

    if (order.orderStatus !== "delivered") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Can only return delivered orders"
      );
    }

    order.returnStatus = "requested";
    order.returnReason = reason;

    await orderRepository.save(order);
    return order;
  }

  /**
   * Get Admin Orders (Admin only)
   */
  async getAdminOrders(filters = {}) {
    const { page = 1, limit = 20, status, userId } = filters;

    const query = {};
    if (status) query.orderStatus = status;
    if (userId) query.userId = userId;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      orderRepository.find(query, {
        populateOptions: [
          { path: "userId", select: "firstName lastName email" },
          { path: "items.productId", select: "name" }
        ],
        sort: { createdAt: -1 },
        skip,
        limit: limitNum,
      }),
      orderRepository.count(query),
    ]);

    return {
      orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    };
  }
}

export default new OrderService();
