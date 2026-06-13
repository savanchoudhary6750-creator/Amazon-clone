import { useNavigate } from 'react-router-dom';
import { useCart } from '../../app/providers/CartContext.jsx';
import { useAuth } from '../../app/providers/AuthContext.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view your cart</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => {
              const product = item.productId;
              const imageUrl = product?.thumbnail || product?.image;
              
              return (
                <div key={`${item.productId}-${index}`} className="bg-white rounded-lg shadow p-4 flex gap-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product?.name || 'Product'}
                      className="w-24 h-24 object-cover rounded flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center" style={{ display: imageUrl ? 'none' : 'flex' }}>
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-2">{product?.name || 'Product Name'}</h3>
                    <p className="text-gray-600 mb-2">Price: ₹ {item.price?.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() =>
                          updateQuantity(product?._id || item.productId, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product?._id || item.productId, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product?._id || item.productId)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹ {(item.price * item.quantity)?.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 border-b pb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹ {cart.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="text-orange-500">-₹ {cart.totalDiscount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹ {cart.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹ {cart.shippingCost?.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total:</span>
              <span>₹ {cart.finalPrice?.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-3"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="w-full text-red-500 hover:text-red-700 mt-3 text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
