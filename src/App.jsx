import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route
            path="shop"
            element={
              <div className="p-8 text-center text-2xl">Shop Page 🛍️</div>
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route
            path="login"
            element={
              <div className="p-8 text-center text-2xl">Login Page 🔐</div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
