import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../../app/providers/OrderContext.jsx';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder, isLoading } = useOrder();
  const [order, setOrder] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const data = await getOrderById(id);
          setOrder(data);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
      fetchOrder();
    }
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id);
      setShowCancelConfirm(false);
      alert('Order cancelled successfully');
      navigate('/orders');
    } catch (error) {
      alert('Error cancelling order: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const canCancel = ['pending', 'confirmed'].includes(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/orders')}
          className="text-orange-500 hover:text-orange-600 mb-6 flex items-center"
        >
          ← Back to Orders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{order.orderNumber}</h1>
                  <p className="text-gray-600">
                    Order placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded font-semibold capitalize ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {order.estimatedDelivery && (
                <p className="text-green-600 font-semibold">
                  Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              )}

              {order.trackingNumber && (
                <p className="text-gray-600 mt-2">
                  Tracking Number: <span className="font-semibold">{order.trackingNumber}</span>
                </p>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items && order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-4 last:border-0">
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹ {item.price?.toFixed(2)}</p>
                      <p className="text-gray-600 text-sm">
                        Total: ₹ {item.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              {order.shippingAddress && (
                <div className="text-gray-700 space-y-1">
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="pt-2 text-sm">Phone: {order.shippingAddress.phone}</p>
                </div>
              )}
            </div>

            {/* Status Timeline */}
            {order.statusHistory && order.statusHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>
                <div className="space-y-4">
                  {order.statusHistory.map((status, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        {idx < order.statusHistory.length - 1 && (
                          <div className="w-1 h-12 bg-gray-300 mt-1"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{status.status}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(status.timestamp).toLocaleString()}
                        </p>
                        {status.note && <p className="text-gray-700 mt-1">{status.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹ {order.subTotal?.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-orange-500">
                    <span>Discount:</span>
                    <span>-₹ {order.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹ {order.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹ {order.shippingCost?.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹ {order.totalAmount?.toFixed(2)}</span>
              </div>

              <div className="pt-2 text-sm text-gray-600">
                <p>Payment Method: {order.paymentMethod || 'N/A'}</p>
                <p>
                  Payment Status:{' '}
                  <span className="font-semibold capitalize">{order.paymentStatus}</span>
                </p>
              </div>

              {canCancel && (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold mt-4"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <h3 className="text-lg font-semibold mb-4">Cancel Order</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
