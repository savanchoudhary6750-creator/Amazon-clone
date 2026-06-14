import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/errors.js";
import { sendResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/**
 * Get Aggregated Dashboard Statistics
 * Returns core counts, revenue history (Line chart), and sales by category (Pie chart)
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [salesResult, ordersCount, productsCount, usersCount] = await Promise.all([
    Order.aggregate([
      { $match: { paymentStatus: { $in: ["completed", "Paid"] } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]),
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments()
  ]);

  const totalSales = salesResult[0]?.total || 0;

  // Revenue History over last 30 days
  const revenueHistory = await Order.aggregate([
    { $match: { paymentStatus: { $in: ["completed", "Paid"] } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 30 }
  ]);

  // Sales by category (joins orders with products)
  const categorySales = await Order.aggregate([
    { $match: { paymentStatus: { $in: ["completed", "Paid"] } } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    {
      $group: {
        _id: "$productInfo.category",
        sales: { $sum: "$items.totalPrice" },
      },
    },
    { $sort: { sales: -1 } }
  ]);

  return sendResponse(res, HTTP_STATUS.OK, "Admin stats fetched successfully", {
    totals: {
      totalSales,
      ordersCount,
      productsCount,
      usersCount
    },
    revenueHistory,
    categorySales
  });
});
