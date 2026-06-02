import { Link } from "react-router-dom";

import "./Card.css";

import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (

    <div className="card">

      {/* IMAGE */}
      <div className="imageContainer">

        <img
          src={product.image}
          alt={product.title}
          className="productImage"
        />

      </div>

      {/* DETAILS */}
      <div className="details">

        <h3 className="title">
          {product.title}
        </h3>

        <div className="rating">
          ⭐⭐⭐⭐☆
          <span>(1,245 ratings)</span>
        </div>

        <div className="price">
          ₹ {product.price}
        </div>

        <div className="prime">
          FREE Prime Delivery
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          className="cartBtn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        {/* VIEW PRODUCT */}
        <Link to={`/product/${product.id}`}>
          <button className="viewBtn">
            View Product
          </button>
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;