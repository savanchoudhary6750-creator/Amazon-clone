import Hero from "../Hero/Hero";

import Footer from "../Footer/Footer";

import ProductList from "../Products/ProductList";

import products from "../../data/products";

function Home() {

  return (

    <>

      <Hero />

      <ProductList
        products={products}
      />

      <Footer />

    </>
  );
}

export default Home;