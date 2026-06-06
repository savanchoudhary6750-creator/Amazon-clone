import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

import { useCart } from "../../context/CartContext";

function Navbar() {

  const { cart } = useCart();

  return (

    <nav className="sticky top-0 z-50 bg-amazon-blue text-white shadow-lg">

      <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">

        {/* LOGO */}

        <Link
          to="/"
          className="text-2xl font-bold whitespace-nowrap hover:text-amazon-gold transition-colors"
        >
          Amazon Clone
        </Link>

        {/* SEARCH */}

        <div className="flex-1 min-w-0">

          <SearchBar />

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base">

          <Link
            to="/"
            className="text-white hover:text-amazon-gold transition-colors whitespace-nowrap"
          >
            🏠 Home
          </Link>

          <Link
            to="/login"
            className="text-white hover:text-amazon-gold transition-colors whitespace-nowrap"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="text-white hover:text-amazon-gold transition-colors whitespace-nowrap"
          >
            Signup
          </Link>

          <Link
            to="/cart"
            className="text-white hover:text-amazon-gold transition-colors whitespace-nowrap font-semibold"
          >
            🛒 Cart ({cart.length})
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;