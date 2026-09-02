import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearCart } from "../features/cart/cartSlice";
import { useAddOrderMutation } from "../features/products/productsApiSlice";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { useState } from "react";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from Redux
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart,
  );

  // sending order (mutation)
  const [addOrder, { isLoading }] = useAddOrderMutation();

  // state to show success screen after confirm order
  const [orderSuccess, setOrderSuccess] = useState(false);

  // اسم المستخدم عشان نعرضه في شاشة النجاح
  const [customerName, setCustomerName] = useState("");

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
    },
  });

  // onSubmit Handler
  const onSubmit = async (formData) => {
    setCustomerName(formData.name);

    const order = {
      items,
      totalPrice,
      totalQuantity,
      shippingInfo: formData,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      // send order to db.json
      await addOrder(order).unwrap();
      dispatch(clearCart());
      setOrderSuccess(true);
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  // success screen

  if (orderSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-6 text-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
          <h1 className="text-4xl font-extrabold text-gray-800">
            Order Placed!
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Thank you{" "}
            <span className="text-blue-600 font-bold">{customerName}</span>!
            Your order has been placed successfully.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // if cart empty

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Your cart is empty
          </h1>
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl"
          >
            Go To Shop
          </Link>
        </div>
      </div>
    );
  }

  // main page

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Shipping Information
          </h2>

          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Address
              </label>
              <input
                type="text"
                placeholder="123 Main Street"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Please enter a more detailed address",
                  },
                })}
                className={`border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.address ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                City
              </label>
              <input
                type="text"
                placeholder="Cairo"
                {...register("city", {
                  required: "City is required",
                  minLength: {
                    value: 2,
                    message: "City must be at least 2 characters",
                  },
                })}
                className={`border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.city ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* the order*/}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            {/* products */}
            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-blue-600 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* total price */}
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
              <span className="text-gray-500">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              {isLoading ? "Placing Order..." : "Confirm Order"}
            </button>

            <Link
              to="/cart"
              className="block text-center mt-4 text-sm text-gray-400 hover:text-blue-600 transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
