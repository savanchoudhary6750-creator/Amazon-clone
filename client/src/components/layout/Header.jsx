import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext.jsx";
import { useCart } from "../../app/providers/CartContext.jsx";

/**
 * Header Component
 * Main navigation header with mobile responsive menu
 */
const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart?.totalItems || 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-amazon sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-amazon-blue hover:text-amazon-orange transition-colors">
            Amazon Clone
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium relative">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
                  Profile
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-amazon-orange transition-colors font-medium">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-amazon-orange transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
              >
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2 flex items-center"
                  >
                    Cart
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
