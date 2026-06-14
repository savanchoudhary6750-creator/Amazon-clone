import React, { Component } from "react";

/**
 * Product Section Error Boundary
 * Catch rendering/loading failures specifically in the product section
 * and gracefully renders a retry UI rather than failing the entire page.
 */
export class ProductSectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Product Section Error caught by boundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full my-8 p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-red-100 shadow-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-2xl">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4 animate-pulse">
            ⚠️
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Failed to Load Products
          </h3>
          <p className="text-gray-500 max-w-md mb-6 text-sm md:text-base">
            {this.state.error?.message || "There was an error communicating with the product service. Please try again."}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <svg
              className="w-4 h-4 animate-spin-reverse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v12"
              />
            </svg>
            Retry Loading Products
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Product Error Trigger Component
 * Throws an error during the render phase to propagate async errors to the Error Boundary.
 */
export function ProductErrorTrigger({ error }) {
  if (error) {
    throw new Error(error);
  }
  return null;
}

export default ProductSectionErrorBoundary;
