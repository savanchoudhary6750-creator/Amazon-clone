import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../../app/providers/ProductContext.jsx';
import { useCart } from '../../app/providers/CartContext.jsx';
import { useAuth } from '../../app/providers/AuthContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addReview, isLoading, error } = useProduct();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  // Review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(id, quantity);
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Error adding to cart: ' + err.message);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const updatedProduct = await addReview(id, { rating: reviewRating, comment: reviewComment });
      setProduct(updatedProduct);
      setReviewRating(5);
      setReviewComment("");
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Submit review error:", err);
      alert("Failed to submit review: " + (err.data?.message || err.message));
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (ratingVal) => {
    const stars = [];
    const rounded = Math.round(ratingVal || 0);
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(<span key={i} className="text-yellow-500 text-lg">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300 dark:text-gray-600 text-lg">★</span>);
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">Error loading product</div>
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/products')}
          className="text-orange-500 hover:text-orange-600 mb-6 flex items-center cursor-pointer font-medium"
        >
          ← Back to Products
        </button>

        {/* Product Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden border dark:border-slate-700 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images?.[selectedImage]?.url || product.thumbnail}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedImage === idx
                          ? 'border-orange-500'
                          : 'border-gray-200 dark:border-slate-700'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-16 object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4 gap-2">
                {renderStars(product.averageRating || product.rating)}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.numReviews || 0} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-orange-500">
                    ₹ {product.price?.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹ {product.originalPrice?.toFixed(2)}
                      </span>
                      <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 px-3 py-1 rounded font-semibold text-sm">
                        {Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )}
                        % OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded font-semibold text-sm ${
                    product.stock > 0
                      ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 disabled:opacity-50 cursor-pointer"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={product.stock === 0}
                    className="w-16 text-center py-2 border-l border-r border-gray-300 dark:border-slate-600 bg-transparent text-gray-900 dark:text-white focus:ring-0"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 disabled:opacity-50 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              {/* Product Info */}
              <div className="border-t dark:border-slate-700 pt-6 space-y-3 text-sm">
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{product.brand}</span>
                  </div>
                )}
                {product.category && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{product.category}</span>
                  </div>
                )}
                {product.sku && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{product.sku}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-amazon p-6 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews Summary */}
            <div className="lg:col-span-1 lg:border-r border-gray-100 dark:border-slate-700 lg:pr-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-extrabold text-gray-800 dark:text-white">
                  {(product.averageRating || product.rating || 0).toFixed(1)}
                </span>
                <div>
                  {renderStars(product.averageRating || product.rating)}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">out of 5 stars</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Based on {product.numReviews || 0} customer ratings
              </p>
            </div>

            {/* Individual Reviews & Submission Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Submission Form */}
              {isAuthenticated ? (
                <form onSubmit={handleReviewSubmit} className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Write a Customer Review</h3>
                  
                  {/* Rating Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                        >
                          <span className={star <= reviewRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}>
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      placeholder="Share your thoughts about this product..."
                      className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white h-24"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400 cursor-pointer"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 text-orange-850 dark:text-orange-400 p-4 rounded-lg text-center text-sm font-medium">
                  Please{" "}
                  <Link to="/login" className="underline font-bold text-orange-600 dark:text-orange-400">
                    login
                  </Link>{" "}
                  to write a review.
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review List</h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev._id} className="p-4 border border-gray-150 dark:border-slate-700 rounded-lg bg-gray-50/50 dark:bg-slate-900/40">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{rev.userName || "Anonymous"}</p>
                          <div className="mt-1">{renderStars(rev.rating)}</div>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(rev.createdAt || rev.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-650 dark:text-gray-300 text-sm mt-1">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-sm">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
