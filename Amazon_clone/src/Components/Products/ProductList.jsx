import ProductCard from "./ProductCard";

import "./ProductList.css";

function ProductList({ products }) {

  return (

    <div className="grid">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}

export default ProductList;