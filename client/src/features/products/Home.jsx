import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../app/providers/ProductContext.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";
import HeroSlider from "../../components/common/HeroSlider.jsx";
import { useLocalStorage } from "../../hooks/index.js";
import ProductSectionErrorBoundary, { ProductErrorTrigger } from "../../components/common/ProductSectionErrorBoundary.jsx";

/**
 * Home Page
 * Displays featured products and hero section
 */
const Home = () => {
  const { getFeaturedProducts, isLoading, error } = useProduct();
  const [featuredProducts, setFeaturedProducts] = React.useState([]);

  const loadFeatured = useCallback(async () => {
    try {
      const products = await getFeaturedProducts(10);
      setFeaturedProducts(products || []);
    } catch (err) {
      console.error("Failed to load featured products:", err);
    }
  }, [getFeaturedProducts]);

  useEffect(() => {
    loadFeatured();
  }, [loadFeatured]);

  return (
    <div className="w-full">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amazon-blue mb-2">Featured Products</h2>
          <div className="h-1 w-20 bg-amazon-gold rounded"></div>
        </div>

        <ProductSectionErrorBoundary onRetry={loadFeatured}>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && <ProductErrorTrigger error={error} />}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </ProductSectionErrorBoundary>
      </section>
    </div>
  );
};

export default Home;
