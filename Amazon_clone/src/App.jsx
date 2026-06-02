import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Cart from "./Components/Pages/Cart";
import AddProduct from "./Components/Pages/AddProduct";

import ProductDetails from "./Components/Products/ProductDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </>
  );
}

export default App;