import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import CartItem from "../components/CartItem/CartItem";

function Cart() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
            Your cart is{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              empty
            </span>
          </h1>
          <p className="text-gray-400 text-lg text-center max-w-md">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Go To Shop
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Your Cart
        <span className="text-blue-600 ml-2">({totalQuantity})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* products menu  */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Items ({totalQuantity})</span>
            <span className="font-semibold text-gray-800">{totalQuantity}</span>
          </div>

          <div className="flex justify-between mb-6 border-t border-gray-100 pt-4">
            <span className="text-gray-500">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95">
            Checkout
          </button>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-gray-400 hover:text-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
