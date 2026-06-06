import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist = {}, fetchWishlist, removeFromWishlist, isLoading } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view your wishlist</p>
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
        <div className="text-xl text-gray-600">Loading wishlist...</div>
      </div>
    );
  }

  const products = wishlist.products || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">
                        ₹ {product.price?.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          ₹ {product.originalPrice?.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {product.rating && (
                      <div className="text-yellow-500 text-sm font-semibold">
                        ★ {product.rating}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-6 text-lg">Your wishlist is empty</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
