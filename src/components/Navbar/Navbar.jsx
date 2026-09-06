import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { clearWishlist } from "../../features/wishlist/wishlistSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state to control mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#2563EB" : "#374151",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold text-gray-800"
          onClick={closeMenu}
        >
          MyStore
        </NavLink>

        {/*  Desktop Nav Links  */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            style={navLinkStyle}
            className="text-lg transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            style={navLinkStyle}
            className="text-lg transition-colors"
          >
            Shop
          </NavLink>
        </div>

        {/*  Desktop Icons  */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/wishlist"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Heart size={22} />
          </NavLink>

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

          {isAuthenticated ? (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
              <span className="text-sm font-semibold text-gray-800">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User size={22} />
            </NavLink>
          )}
        </div>

        {/*  Mobile: Icons + Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          {/* Cart Icon */}
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className="relative text-gray-600"
          >
            <ShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {/*لو المينو مفتوحة يعرض x  */}
            {/*لو المينو مغلقة يعرض ايقون الهمبورجر  */}
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/*  Mobile Menu  */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {/* Links */}
          <NavLink
            to="/"
            onClick={closeMenu}
            style={navLinkStyle}
            className="text-lg font-medium py-2 border-b border-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={closeMenu}
            style={navLinkStyle}
            className="text-lg font-medium py-2 border-b border-gray-100"
          >
            Shop
          </NavLink>
          <NavLink
            to="/wishlist"
            onClick={closeMenu}
            className="flex items-center gap-2 text-gray-700 py-2 border-b border-gray-100"
          >
            <Heart size={18} />
            Wishlist
          </NavLink>

          {/* User Section  */}
          {isAuthenticated ? (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-semibold text-gray-800">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 text-gray-700 py-2"
            >
              <User size={18} />
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
