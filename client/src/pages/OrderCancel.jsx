import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

function OrderCancel() {
  const navigate = useNavigate();

  return (
    <div
      style={{ background: "var(--bg-primary)" }}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <XCircle className="w-20 h-20 text-red-500" />
        <h1
          style={{ color: "var(--text-primary)" }}
          className="text-4xl font-extrabold"
        >
          Payment Cancelled
        </h1>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-lg max-w-md"
        >
          Your payment was not completed. Your cart is still saved, you can try
          again anytime.
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
}

export default OrderCancel;
