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
      <div
        style={{ background: "var(--bg-primary)" }}
        className="flex justify-center items-center h-screen w-full"
      >
        <div className="flex flex-col items-center gap-6">
          <h1
            className="text-4xl md:text-5xl font-extrabold  text-center"
            style={{ color: "var(--text-primary)" }}
          >
            Your cart is{" "}
            {/* <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> */}
            <span className="text-blue-600">empty</span>
          </h1>
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-lg text-center max-w-md"
          >
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
          >
            Go To Shop
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ background: "var(--bg-primary)" }}
      className="max-w-6xl mx-auto px-4 py-12 min-h-screen"
    >
      <h1
        className="text-3xl font-bold  mb-8"
        style={{ color: "var(--text-primary)" }}
      >
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
        <div
          className=" border  rounded-2xl p-6 h-fit"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2
            className="text-xl font-bold  mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span style={{ color: "var(--text-secondary)" }}>
              Items ({totalQuantity})
            </span>
            <span
              className="font-semibold "
              style={{ color: "var(--text-primary)" }}
            >
              {totalQuantity}
            </span>
          </div>

          <div
            className="flex justify-between mb-6 border-t  pt-4"
            style={{
              borderColor: "var(--border-color)",
            }}
          >
            <span style={{ color: "var(--text-secondary)" }}>Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Link
            to="/checkout"
            // className="block mx-auto w-[80%] py-4 text-center bg-blue-600 text-white hover:bg-blue-700  font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-center"
          >
            Checkout
          </Link>

          <Link
            to="/"
            className="block text-center mt-4 text-sm hover:text-blue-600 transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
