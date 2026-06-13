import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers.js";
import { useCart } from "../../app/providers/CartContext.jsx";
import { useToast } from "../../app/providers/ToastProvider.jsx";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success, error } = useToast();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product._id, 1);
      success("Product added to cart!");
    } catch (err) {
      error("Failed to add to cart. Please login first.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-amazon hover:shadow-amazon-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
    >
      {/* Product Image */}
      <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-sm">No Image</div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-500">★</span>
            <span className="text-xs text-gray-600">
              {product.rating} ({product.numReviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-amazon-red">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs line-through text-gray-500">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <p
          className={`text-xs mb-4 ${
            product.stock > 0
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          <button
            className="btn-amazon-gold w-full py-2 text-sm font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Details
          </button>
          <button
            className="w-full py-2 text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
