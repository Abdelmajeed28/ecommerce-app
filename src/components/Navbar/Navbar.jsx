import { NavLink } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          MyStore
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg "
            style={({ isActive }) => ({
              color: isActive ? "blue" : "black",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg "
            style={({ isActive }) => ({
              color: isActive ? "blue" : "black",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Shop
          </NavLink>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Heart size={22} />
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {/* User */}
          <NavLink
            to="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <User size={22} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
