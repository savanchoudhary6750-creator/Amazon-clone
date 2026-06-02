import { Link } from "react-router-dom";

import "./Navbar.css";

import SearchBar from "../SearchBar/SearchBar";

import { useCart } from "../../context/CartContext";

function Navbar() {

  const { cart } = useCart();

  return (

    <div className="navbar">

      {/* LOGO */}

      <Link
        to="/"
        className="logo"
      >
        Amazon Clone
      </Link>

      {/* SEARCH */}

      <div className="searchSection">

        <SearchBar />

      </div>

      {/* RIGHT SIDE */}

      <div className="navRight">

      <Link
           to="/"
           className="navLink"
>
  🏠 Home
        </Link>

        <Link
          to="/login"
          className="navLink"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="navLink"
        >
          Signup
        </Link>

        <Link
          to="/cart"
          className="cartLink"
        >
          Cart ({cart.length})
        </Link>

      </div>

    </div>
  );
}

export default Navbar;