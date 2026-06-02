import { useCart } from "../../context/CartContext";

import "./Cart.css";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  return (

    <div className="cartPage">

      <div className="cartContainer">

        <h1 className="cartTitle">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <h3>Your cart is empty</h3>

        ) : (

          cart.map((item) => (

            <div
              key={item.id}
              className="cartItem"
            >

              <img
                src={item.image}
                alt={item.title}
                className="cartImage"
              />

              <div className="cartDetails">

                <h3>{item.title}</h3>

                <p className="cartPrice">
                  ₹ {item.price}
                </p>

                <div className="qtyBox">

                  <button
                    className="qtyBtn"
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="qtyBtn"
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="removeBtn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))
        )}

        <h2 className="totalPrice">
          Total: ₹ {total}
        </h2>

      </div>

    </div>
  );
}

export default Cart;