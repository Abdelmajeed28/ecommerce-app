import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { CheckCircle } from "lucide-react";
import { productsApiSlice } from "../features/products/productsApiSlice";

function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  الكارت بيتصفى هنا بس، بعد ما اليوزر رجع من صفحة الدفع الناجحة فعلياً
  // مش في Checkout.jsx وقت الضغط على الزرار
  useEffect(() => {
    dispatch(clearCart());
    dispatch(productsApiSlice.util.invalidateTags(["Product"]));
  }, [dispatch]);

  return (
    <div
      style={{ background: "var(--bg-primary)" }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <h1
          style={{ color: "var(--text-primary)" }}
          className="text-4xl font-extrabold"
        >
          Payment Successful!
        </h1>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-lg max-w-md"
        >
          Thank you for your order! We've received your payment and your order
          is being processed.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/profile")}
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            className="px-8 py-3 border text-lg font-bold rounded-2xl transition-all active:scale-95"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
