import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { clearWishlist } from "../../features/wishlist/wishlistSlice";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/login");
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";
  return (
    <nav
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
      }}
      className="sticky top-0 z-50 shadow-sm transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          style={{ color: "var(--text-primary)" }}
          className="text-xl font-bold"
        >
          MyStore
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#2563EB" : "var(--text-primary)",
              fontWeight: isActive ? "bold" : "normal",
            })}
            className="text-lg transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            style={({ isActive }) => ({
              color: isActive ? "#2563EB" : "var(--text-primary)",
              fontWeight: isActive ? "bold" : "normal",
            })}
            className="text-lg transition-colors"
          >
            Shop
          </NavLink>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            style={{ color: "var(--text-secondary)" }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            style={{ color: "var(--text-secondary)" }}
            className="hover:opacity-80 transition-opacity"
          >
            <Heart size={22} />
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            style={{ color: "var(--text-secondary)" }}
            className="relative hover:opacity-80 transition-opacity"
          >
            <ShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {/*  avatar for user*/}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-[#2563EB] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isAuthenticated ? firstLetter : <User size={18} />}
            </button>

            {userMenuOpen && (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden"
              >
                {isAuthenticated ? (
                  <>
                    <div
                      style={{
                        color: "var(--text-primary)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                      className="px-4 py-3 text-sm font-semibold"
                    >
                      Hi, {user?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setUserMenuOpen(false)}
                      style={{ color: "var(--text-primary)" }}
                      className="block px-4 py-3 text-sm hover:opacity-70"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setUserMenuOpen(false)}
                      style={{ color: "var(--text-primary)" }}
                      className="block px-4 py-3 text-sm hover:opacity-70"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Icons + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Dark Mode Toggle Mobile */}
          <button onClick={toggleTheme}>
            {isDark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} style={{ color: "var(--text-secondary)" }} />
            )}
          </button>

          {/* Cart Mobile */}
          <NavLink
            to="/cart"
            onClick={closeMenu}
            style={{ color: "var(--text-secondary)" }}
            className="relative"
          >
            <ShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg-primary)",
            borderTop: "1px solid var(--border-color)",
          }}
          className="md:hidden px-4 py-4 flex flex-col gap-4"
        >
          <NavLink
            to="/"
            onClick={closeMenu}
            style={({ isActive }) => ({
              color: isActive ? "#2563EB" : "var(--text-primary)",
              fontWeight: isActive ? "bold" : "normal",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "8px",
            })}
            className="text-lg font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={closeMenu}
            style={({ isActive }) => ({
              color: isActive ? "#2563EB" : "var(--text-primary)",
              fontWeight: isActive ? "bold" : "normal",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "8px",
            })}
            className="text-lg font-medium"
          >
            Shop
          </NavLink>
          <NavLink
            to="/wishlist"
            onClick={closeMenu}
            style={{
              color: "var(--text-primary)",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "8px",
            }}
            className="flex items-center gap-2"
          >
            <Heart size={18} />
            Wishlist
          </NavLink>

          {isAuthenticated ? (
            <div className="flex items-center justify-between py-2">
              <span
                style={{ color: "var(--text-primary)" }}
                className="text-sm font-semibold"
              >
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 text-sm font-semibold"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
              style={{ color: "var(--text-primary)" }}
              className="flex items-center gap-2 py-2"
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

////////////////////////////////////////////////
// import { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   ShoppingCart,
//   Heart,
//   User,
//   LogOut,
//   Menu,
//   X,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { clearCart } from "../../features/cart/cartSlice";
// import { clearWishlist } from "../../features/wishlist/wishlistSlice";
// import { useTheme } from "../../context/ThemeContext";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isDark, toggleTheme } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false); // ✅ جديد
//   const userMenuRef = useRef(null); // ✅ جديد
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(clearCart());
//     dispatch(clearWishlist());
//     navigate("/login");
//     setMenuOpen(false);
//     setUserMenuOpen(false);
//   };

//   const closeMenu = () => setMenuOpen(false);

//   // ✅ يقفل الـ dropdown لو ضغطت في أي مكان برة منه
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

//   return (
//     <nav
//       style={{
//         background: "var(--bg-primary)",
//         borderBottom: "1px solid var(--border-color)",
//       }}
//       className="sticky top-0 z-50 shadow-sm transition-colors duration-200"
//     >
//       <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <NavLink
//           to="/"
//           onClick={closeMenu}
//           style={{ color: "var(--text-primary)" }}
//           className="text-xl font-bold"
//         >
//           MyStore
//         </NavLink>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex items-center gap-6">
//           <NavLink
//             to="/"
//             style={({ isActive }) => ({
//               color: isActive ? "#2563EB" : "var(--text-primary)",
//               fontWeight: isActive ? "bold" : "normal",
//             })}
//             className="text-lg transition-colors"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/shop"
//             style={({ isActive }) => ({
//               color: isActive ? "#2563EB" : "var(--text-primary)",
//               fontWeight: isActive ? "bold" : "normal",
//             })}
//             className="text-lg transition-colors"
//           >
//             Shop
//           </NavLink>
//         </div>

//         {/* Desktop Icons */}
//         <div className="hidden md:flex items-center gap-4">
//           <button
//             onClick={toggleTheme}
//             style={{ color: "var(--text-secondary)" }}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             {isDark ? (
//               <Sun size={20} className="text-yellow-400" />
//             ) : (
//               <Moon size={20} />
//             )}
//           </button>

//           <NavLink
//             to="/wishlist"
//             style={{ color: "var(--text-secondary)" }}
//             className="hover:opacity-80 transition-opacity"
//           >
//             <Heart size={22} />
//           </NavLink>

//           <NavLink
//             to="/cart"
//             style={{ color: "var(--text-secondary)" }}
//             className="relative hover:opacity-80 transition-opacity"
//           >
//             <ShoppingCart size={22} />
//             {totalQuantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {totalQuantity}
//               </span>
//             )}
//           </NavLink>

//           {/* ✅ الأڤاتار الجديد بدل الكارت القديم */}
//           <div className="relative" ref={userMenuRef}>
//             <button
//               onClick={() => setUserMenuOpen((prev) => !prev)}
//               className="w-9 h-9 rounded-full bg-[#2563EB] text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
//             >
//               {isAuthenticated ? firstLetter : <User size={18} />}
//             </button>

//             {userMenuOpen && (
//               <div
//                 style={{
//                   background: "var(--bg-card)",
//                   border: "1px solid var(--border-color)",
//                 }}
//                 className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden"
//               >
//                 {isAuthenticated ? (
//                   <>
//                     <div
//                       style={{
//                         color: "var(--text-primary)",
//                         borderBottom: "1px solid var(--border-color)",
//                       }}
//                       className="px-4 py-3 text-sm font-semibold"
//                     >
//                       Hi, {user?.name}
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink
//                       to="/login"
//                       onClick={() => setUserMenuOpen(false)}
//                       style={{ color: "var(--text-primary)" }}
//                       className="block px-4 py-3 text-sm hover:opacity-70"
//                     >
//                       Login
//                     </NavLink>
//                     <NavLink
//                       to="/register"
//                       onClick={() => setUserMenuOpen(false)}
//                       style={{ color: "var(--text-primary)" }}
//                       className="block px-4 py-3 text-sm hover:opacity-70"
//                     >
//                       Register
//                     </NavLink>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile: Icons + Hamburger */}
//         <div className="flex md:hidden items-center gap-3">
//           <button onClick={toggleTheme}>
//             {isDark ? (
//               <Sun size={20} className="text-yellow-400" />
//             ) : (
//               <Moon size={20} style={{ color: "var(--text-secondary)" }} />
//             )}
//           </button>

//           <NavLink
//             to="/cart"
//             onClick={closeMenu}
//             style={{ color: "var(--text-secondary)" }}
//             className="relative"
//           >
//             <ShoppingCart size={22} />
//             {totalQuantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {totalQuantity}
//               </span>
//             )}
//           </NavLink>

//           <button
//             onClick={() => setMenuOpen((prev) => !prev)}
//             style={{ color: "var(--text-primary)" }}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div
//           style={{
//             background: "var(--bg-primary)",
//             borderTop: "1px solid var(--border-color)",
//           }}
//           className="md:hidden px-4 py-4 flex flex-col gap-4"
//         >
//           <NavLink
//             to="/"
//             onClick={closeMenu}
//             style={({ isActive }) => ({
//               color: isActive ? "#2563EB" : "var(--text-primary)",
//               fontWeight: isActive ? "bold" : "normal",
//               borderBottom: "1px solid var(--border-color)",
//               paddingBottom: "8px",
//             })}
//             className="text-lg font-medium"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/shop"
//             onClick={closeMenu}
//             style={({ isActive }) => ({
//               color: isActive ? "#2563EB" : "var(--text-primary)",
//               fontWeight: isActive ? "bold" : "normal",
//               borderBottom: "1px solid var(--border-color)",
//               paddingBottom: "8px",
//             })}
//             className="text-lg font-medium"
//           >
//             Shop
//           </NavLink>
//           <NavLink
//             to="/wishlist"
//             onClick={closeMenu}
//             style={{
//               color: "var(--text-primary)",
//               borderBottom: "1px solid var(--border-color)",
//               paddingBottom: "8px",
//             }}
//             className="flex items-center gap-2"
//           >
//             <Heart size={18} />
//             Wishlist
//           </NavLink>

//           {isAuthenticated ? (
//             <div className="flex items-center justify-between py-2">
//               <span
//                 style={{ color: "var(--text-primary)" }}
//                 className="text-sm font-semibold"
//               >
//                 Hi, {user?.name}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-1 text-red-500 text-sm font-semibold"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <NavLink
//               to="/login"
//               onClick={closeMenu}
//               style={{ color: "var(--text-primary)" }}
//               className="flex items-center gap-2 py-2"
//             >
//               <User size={18} />
//               Login
//             </NavLink>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
