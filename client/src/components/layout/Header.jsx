import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext.jsx";
import { useCart } from "../../app/providers/CartContext.jsx";
import { useTheme } from "../../app/providers/ThemeContext.jsx";

/**
 * Header Component
 * Main navigation header with mobile responsive menu and dark mode toggle
 */
const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart?.totalItems || 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-amazon sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-amazon-blue dark:text-amazon-orange hover:text-amazon-orange transition-colors">
            Amazon Clone
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium relative">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
                  Profile
                </Link>
                <Link to="/orders" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium">
                  Register
                </Link>
              </>
            )}

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.121 4.243a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-2.293 4.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM11 17a1 1 0 10-2 0v1a1 1 0 102 0v-1zm-6.293-2.293a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 9a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm1.293-4.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Dark/Light Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.121 4.243a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-2.293 4.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM11 17a1 1 0 10-2 0v1a1 1 0 102 0v-1zm-6.293-2.293a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 9a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm1.293-4.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors p-2"
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
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={closeMobileMenu}
                className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
              >
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2 flex items-center"
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
                    className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="text-gray-700 dark:text-gray-200 hover:text-amazon-orange transition-colors font-medium py-2"
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
