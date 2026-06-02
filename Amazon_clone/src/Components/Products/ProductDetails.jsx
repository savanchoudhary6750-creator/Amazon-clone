import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import products from "../../data/products";

import { useCart } from "../../context/CartContext";

import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {

    return (
      <h2 className="notFound">
        Product Not Found
      </h2>
    );
  }

  const relatedProducts = products.filter(

    (item) =>

      item.category === product.category &&
      item.id !== product.id
  );

  return (

    <div className="productPage">

      <button
        className="backBtn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="productContainer">

        <div className="leftSection">

          <img
            src={product.image}
            alt={product.title}
          />

        </div>

        <div className="rightSection">

          <h1>{product.title}</h1>

          <div className="rating">
            ⭐⭐⭐⭐☆ 4.3 Ratings
          </div>

          <div className="price">
            ₹ {product.price}
          </div>

          <p className="description">
            {product.description}
          </p>

          <div className="stock">
            In Stock
          </div>

          <div className="buttonGroup">

            <button
              className="cartBtn"
              onClick={() =>
                addToCart(product)
              }
            >
              Add To Cart
            </button>

            <button className="buyBtn">
              Buy Now
            </button>

          </div>

        </div>

      </div>

      <div className="relatedSection">

        <h2>
          Related Products
        </h2>

        <div className="relatedGrid">

          {relatedProducts.map((item) => (

            <Link
              to={`/product/${item.id}`}
              className="relatedCard"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <h3>{item.title}</h3>

              <p>₹ {item.price}</p>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;