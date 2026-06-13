import React, { useEffect, useState } from "react";
import { orderService } from "../../services/orderService.js";

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAdminOrders({ limit: 100 });
      setOrders(res?.orders || []);
      setError("");
    } catch (err) {
      console.error("Failed to load admin orders:", err);
      setError("Failed to fetch customer orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await orderService.updateStatus(id, status, `Status updated to ${status} by Admin`);
      alert(`Order status updated to ${status}!`);
      fetchOrders();
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  const handleUpdatePayment = async (id, paymentStatus) => {
    try {
      await orderService.updatePaymentStatus(id, paymentStatus, "ADMIN_MANUAL_CAPTURE");
      alert(`Payment status updated to ${paymentStatus}!`);
      fetchOrders();
    } catch (err) {
      console.error("Update payment error:", err);
      alert("Failed to update payment status");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p className="text-lg font-semibold">Loading orders list...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Customer Orders</h1>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID & Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total (₹)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fulfillment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm text-gray-500">
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-950 font-semibold text-xs font-mono">{order._id}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 font-semibold">₹ {order.finalPrice?.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 font-semibold rounded-full ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {order.paymentStatus}
                      </span>
                      {order.paymentStatus !== "Paid" && (
                        <button
                          onClick={() => handleUpdatePayment(order._id, "Paid")}
                          className="text-xs text-indigo-600 hover:text-indigo-900 underline"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className="text-xs border border-gray-300 rounded p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;