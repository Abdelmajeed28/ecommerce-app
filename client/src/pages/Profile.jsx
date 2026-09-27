import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../features/products/productsApiSlice";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Package } from "lucide-react";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { data: orders = [], isLoading } = useGetMyOrdersQuery();

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12 min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Account Info */}
      <div
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        className="border rounded-2xl p-6 mb-8"
      >
        <h1
          style={{ color: "var(--text-primary)" }}
          className="text-2xl font-bold mb-2"
        >
          {user?.name}
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>{user?.email}</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link
          to="/cart"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
          className="border rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-all"
        >
          <ShoppingCart className="text-blue-600" />
          <span
            style={{ color: "var(--text-primary)" }}
            className="font-semibold"
          >
            My Cart
          </span>
        </Link>
        <Link
          to="/wishlist"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
          className="border rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-all"
        >
          <Heart className="text-red-500" />
          <span
            style={{ color: "var(--text-primary)" }}
            className="font-semibold"
          >
            My Wishlist
          </span>
        </Link>
      </div>

      {/* Orders */}
      <h2
        style={{ color: "var(--text-primary)" }}
        className="text-xl font-bold mb-4 flex items-center gap-2"
      >
        <Package size={22} /> My Orders
      </h2>

      {isLoading ? (
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
      ) : orders.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
              className="border rounded-2xl p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <span
                  style={{ color: "var(--text-secondary)" }}
                  className="text-sm"
                >
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 capitalize">
                  {order.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-primary)" }}>
                      {item.title} x{item.quantity}
                    </span>
                    <span className="text-blue-600 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="border-t pt-3 flex justify-between font-bold"
                style={{ borderColor: "var(--border-color)" }}
              >
                <span style={{ color: "var(--text-primary)" }}>Total</span>
                <span className="text-blue-600">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
