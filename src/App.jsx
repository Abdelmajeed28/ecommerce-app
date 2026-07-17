import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layouts/MainLayout";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Shop />} />
          <Route
            path="shop"
            element={
              <div className="p-8 text-center text-2xl">Shop Page 🛍️</div>
            }
          />
          <Route
            path="cart"
            element={
              <div className="p-8 text-center text-2xl">Cart Page 🛒</div>
            }
          />
          <Route
            path="wishlist"
            element={
              <div className="p-8 text-center text-2xl">Wishlist Page ❤️</div>
            }
          />
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
