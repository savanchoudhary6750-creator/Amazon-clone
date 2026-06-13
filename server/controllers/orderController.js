import orderService from "../services/orderService.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Order Controller
 * Handles order-related endpoints
 */

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, billingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !paymentMethod) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Shipping address and payment method are required"
    );
  }

  const order = await orderService.createOrder(req.user.id, req.body);

  return sendResponse(
    res,
    HTTP_STATUS.CREATED,
    "Order created successfully",
    order
  );
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id, req.user.id);

  return sendResponse(res, HTTP_STATUS.OK, "Order fetched successfully", order);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const { orders, pagination } = await orderService.getUserOrders(
    req.user.id,
    req.query
  );

  return sendResponse(res, HTTP_STATUS.OK, "Orders fetched successfully", {
    orders,
    pagination,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  if (!status) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Status is required"
    );
  }

  const order = await orderService.updateOrderStatus(
    req.params.id,
    status,
    note
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Order status updated successfully",
    order
  );
});

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus, transactionId } = req.body;

  if (!paymentStatus) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Payment status is required"
    );
  }

  const order = await orderService.updatePaymentStatus(
    req.params.id,
    paymentStatus,
    transactionId
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Payment status updated successfully",
    order
  );
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(req.params.id, req.user.id);

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Order cancelled successfully",
    order
  );
});

export const requestReturn = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      "Return reason is required"
    );
  }

  const order = await orderService.requestReturn(
    req.params.id,
    req.user.id,
    reason
  );

  return sendResponse(
    res,
    HTTP_STATUS.OK,
    "Return requested successfully",
    order
  );
});

export const getAdminOrders = asyncHandler(async (req, res) => {
  const { orders, pagination } = await orderService.getAdminOrders(req.query);

  return sendResponse(res, HTTP_STATUS.OK, "Admin orders fetched", {
    orders,
    pagination,
  });
});
