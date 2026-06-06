import React, { useEffect } from "react";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import ProductList from "../Products/ProductList";
import { useProduct } from "../../context/ProductContext";

function Home() {
  const {
    products,
    fetchProducts,
    isLoading,
    error,
  } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <ProductList products={products} />
      <Footer />
    </>
  );
}

export default Home;