// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useCreateCheckoutSessionMutation } from "../features/products/productsApiSlice";
// import { ShoppingBag } from "lucide-react";
// import { useState } from "react";

// function Checkout() {
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   // get data from Redux
//   const { items, totalPrice, totalQuantity } = useSelector(
//     (state) => state.cart,
//   );

//   // sending order (mutation)
//   const [createCheckoutSession, { isLoading }] =
//     useCreateCheckoutSessionMutation();
//   const [serverError, setServerError] = useState("");
//   // state to show success screen after confirm order
//   // const [orderSuccess, setOrderSuccess] = useState(false);

//   // اسم المستخدم عشان نعرضه في شاشة النجاح
//   // const [customerName, setCustomerName] = useState("");

//   // React Hook Form Setup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       phone: "",
//       email: "",
//       address: "",
//       city: "",
//     },
//   });

//   // onSubmit Handler
//   const onSubmit = async (formData) => {
//     setServerError(formData.name);

//     const orderData = {
//       items,
//       totalPrice,
//       totalQuantity,
//       shippingInfo: formData,
//       // date: new Date().toISOString(),
//       // status: "pending",
//     };

//     try {
//       // send order to db.json
//       // await addOrder(order).unwrap();
//       // dispatch(clearCart());
//       // setOrderSuccess(true);
//       const result = await createCheckoutSession(orderData).unwrap();
//       window.location.assign(result.url);
//     } catch (err) {
//       setServerError(
//         err.data?.message || "Something went wrong. Please try again.",
//       );
//     }
//   };

//   // success screen

//   // if (orderSuccess) {
//   //   return (
//   //     <div
//   //       style={{ background: "var(--bg-primary)" }}
//   //       className="flex justify-center items-center min-h-screen"
//   //     >
//   //       <div className="flex flex-col items-center gap-6 text-center">
//   //         <CheckCircle className="w-20 h-20 text-green-500" />
//   //         <h1
//   //           style={{ color: "var(--text-primary)" }}
//   //           className="text-4xl font-extrabold"
//   //         >
//   //           Order Placed!
//   //         </h1>
//   //         <p
//   //           style={{ color: "var(--text-secondary)" }}
//   //           className=" text-lg max-w-md"
//   //         >
//   //           Thank you{" "}
//   //           <span className="text-blue-600 font-bold">{customerName}</span>!
//   //           Your order has been placed successfully.
//   //         </p>
//   //         <button
//   //           onClick={() => navigate("/")}
//   //           className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
//   //         >
//   //           Continue Shopping
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // if cart empty

//   if (items.length === 0) {
//     return (
//       <div
//         style={{ background: "var(--bg-primary)" }}
//         className="flex justify-center items-center min-h-screen"
//       >
//         <div className="flex flex-col items-center gap-6">
//           <h1
//             style={{ color: "var(--text-primary)" }}
//             className="text-3xl font-bold "
//           >
//             Your cart is empty
//           </h1>
//           <Link
//             to="/"
//             className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl"
//           >
//             Go To Shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // main page

//   return (
//     <div
//       style={{ background: "var(--bg-primary)" }}
//       className="max-w-6xl mx-auto px-4 py-12 min-h-screen"
//     >
//       <h1
//         style={{ color: "var(--text-primary)" }}
//         className="text-3xl font-bold  mb-8"
//       >
//         Checkout
//       </h1>
//       {serverError && (
//         <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl text-center">
//           {serverError}
//         </div>
//       )}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//       >
//         <div
//           style={{
//             background: "var(--bg-card)",
//             borderColor: "var(--border-color)",
//           }}
//           className="lg:col-span-2 border rounded-2xl p-6"
//         >
//           <h2
//             style={{ color: "var(--text-primary)" }}
//             className="text-xl font-bold  mb-6"
//           >
//             Shipping Information
//           </h2>

//           <div className="flex flex-col gap-4">
//             {/* Full Name */}
//             <div className="flex flex-col gap-1">
//               <label
//                 style={{ color: "var(--text-secondary)" }}
//                 className="text-sm font-semibold"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 {...register("name", {
//                   required: "Name is required",
//                   minLength: {
//                     value: 2,
//                     message: "Name must be at least 2 characters",
//                   },
//                 })}
//                 style={{
//                   background: "var(--bg-secondary)",
//                   color: "var(--text-primary)",
//                   borderColor: errors.name ? "#f87171" : "var(--border-color)",
//                 }}
//                 className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all "
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs">{errors.name.message}</p>
//               )}
//             </div>
//             {/*  Phone */}
//             <div className="flex flex-col gap-1">
//               <label
//                 style={{ color: "var(--text-secondary)" }}
//                 className="text-sm font-semibold"
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 placeholder="01xxxxxxxxx"
//                 {...register("phone", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^[0-9+\s-]{8,15}$/, // بنقبل أرقام ومسافات و+ و- بطول معقول
//                     message: "Enter a valid phone number",
//                   },
//                 })}
//                 style={{
//                   background: "var(--bg-secondary)",
//                   color: "var(--text-primary)",
//                   borderColor: errors.phone ? "#f87171" : "var(--border-color)",
//                 }}
//                 className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-xs">{errors.phone.message}</p>
//               )}
//             </div>
//             {/* Email */}
//             <div className="flex flex-col gap-1">
//               <label
//                 style={{ color: "var(--text-secondary)" }}
//                 className="text-sm font-semibold "
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Enter a valid email address",
//                   },
//                 })}
//                 style={{
//                   background: "var(--bg-secondary)",
//                   color: "var(--text-primary)",
//                   borderColor: errors.name ? "#f87171" : "var(--border-color)",
//                 }}
//                 className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all "
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Address */}
//             <div className="flex flex-col gap-1">
//               <label
//                 style={{ color: "var(--text-secondary)" }}
//                 className="text-sm font-semibold "
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 placeholder="123 Main Street"
//                 {...register("address", {
//                   required: "Address is required",
//                   minLength: {
//                     value: 5,
//                     message: "Please enter a more detailed address",
//                   },
//                 })}
//                 style={{
//                   background: "var(--bg-secondary)",
//                   color: "var(--text-primary)",
//                   borderColor: errors.name ? "#f87171" : "var(--border-color)",
//                 }}
//                 className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all "
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-xs">{errors.address.message}</p>
//               )}
//             </div>

//             {/* City */}
//             <div className="flex flex-col gap-1">
//               <label
//                 style={{ color: "var(--text-secondary)" }}
//                 className="text-sm font-semibold "
//               >
//                 City
//               </label>
//               <input
//                 type="text"
//                 placeholder="Cairo"
//                 {...register("city", {
//                   required: "City is required",
//                   minLength: {
//                     value: 2,
//                     message: "City must be at least 2 characters",
//                   },
//                 })}
//                 style={{
//                   background: "var(--bg-secondary)",
//                   color: "var(--text-primary)",
//                   borderColor: errors.name ? "#f87171" : "var(--border-color)",
//                 }}
//                 className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all "
//               />
//               {errors.city && (
//                 <p className="text-red-500 text-xs">{errors.city.message}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* the order*/}
//         <div
//           style={{
//             background: "var(--bg-card)",
//             borderColor: "var(--border-color)",
//           }}
//           className="border rounded-2xl p-6 h-fit"
//         >
//           <h2
//             style={{ color: "var(--text-primary)" }}
//             className="text-xl font-bold  mb-4"
//           >
//             Order Summary
//           </h2>

//           {/* products */}
//           <div className="flex flex-col gap-3 mb-4">
//             {items.map((item) => (
//               <div key={item.id} className="flex items-center gap-3">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-12 h-12 rounded-xl object-cover shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p
//                     style={{ color: "var(--text-primary)" }}
//                     className="text-sm font-semibold  truncate"
//                   >
//                     {item.title}
//                   </p>
//                   <p
//                     style={{ color: "var(--text-secondary)" }}
//                     className="text-xs "
//                   >
//                     x{item.quantity}
//                   </p>
//                 </div>
//                 <p className="text-sm font-bold text-blue-600 shrink-0">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* total price */}
//           <div
//             style={{ borderColor: "var(--border-color)" }}
//             className="border-t  pt-4 flex justify-between items-center mb-6"
//           >
//             <span style={{ color: "var(--text-secondary)" }}>Total</span>
//             <span className="text-2xl font-bold text-blue-600">
//               ${totalPrice.toFixed(2)}
//             </span>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="cursor-pointer w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
//           >
//             <ShoppingBag size={20} />
//             {isLoading ? "Redirecting to payment..." : "Proceed to Payment"}
//           </button>

//           <Link
//             to="/cart"
//             style={{ color: "var(--text-secondary)" }}
//             className="block text-center mt-4 text-sm  hover:text-blue-600 transition-colors"
//           >
//             Back to Cart
//           </Link>
//         </div>
//         {/* </div> */}
//       </form>
//     </div>
//   );
// }

// export default Checkout;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Banknote,
  CreditCard,
  LoaderCircle,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import {
  useCreateCashOnDeliveryOrderMutation,
  useCreateCheckoutSessionMutation,
} from "../features/products/productsApiSlice";
import { clearCart } from "../features/cart/cartSlice";
import {
  getProductImage,
  useProductImageFallback,
} from "../utils/productImage";
import ProductPrice from "../components/ProductPrice";

const fields = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "John Doe",
    type: "text",
    autocomplete: "name",
    rules: {
      required: "Name is required",
      minLength: { value: 2, message: "Enter at least 2 characters" },
    },
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "01xxxxxxxxx",
    type: "tel",
    autocomplete: "tel",
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9+\s-]{8,15}$/,
        message: "Enter a valid phone number",
      },
    },
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    type: "email",
    autocomplete: "email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Street, building and apartment",
    type: "text",
    autocomplete: "street-address",
    rules: {
      required: "Address is required",
      minLength: { value: 5, message: "Enter a more detailed address" },
    },
  },
  {
    name: "city",
    label: "City",
    placeholder: "Cairo",
    type: "text",
    autocomplete: "address-level2",
    rules: {
      required: "City is required",
      minLength: { value: 2, message: "Enter at least 2 characters" },
    },
  },
];

function CheckoutField({ field, register, error }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={field.name}
        className="block text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {field.label}
      </label>
      <input
        id={field.name}
        type={field.type}
        autoComplete={field.autocomplete}
        placeholder={field.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${field.name}-error` : undefined}
        {...register(field.name, field.rules)}
        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          borderColor: error ? "#ef4444" : "var(--border-color)",
        }}
      />
      {error && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="text-xs text-red-600"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}

function CheckoutLoader({ paymentMethod }) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-slate-900 px-8 py-9 text-center text-white shadow-2xl">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-400/20" />
          <span className="absolute inset-1 animate-spin rounded-full border-4 border-blue-300/20 border-t-blue-400" />
          <PackageCheck
            className="relative text-blue-200"
            size={30}
            aria-hidden="true"
          />
        </div>
        <p className="text-xl font-bold">
          {paymentMethod === "cash_on_delivery"
            ? "Placing your order"
            : "Preparing secure payment"}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Please wait a moment. Keep this page open.
        </p>
      </div>
    </div>
  );
}

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart,
  );
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [serverError, setServerError] = useState("");
  const [createCheckoutSession, { isLoading: isCardLoading }] =
    useCreateCheckoutSessionMutation();
  const [createCashOrder, { isLoading: isCashLoading }] =
    useCreateCashOnDeliveryOrderMutation();
  const isSubmitting = isCardLoading || isCashLoading;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (shippingInfo) => {
    setServerError("");
    const orderData = {
      items: items.map(({ id, quantity, price }) => ({ id, quantity, price })),
      shippingInfo,
    };

    try {
      if (paymentMethod === "cash_on_delivery") {
        const result = await createCashOrder(orderData).unwrap();
        dispatch(clearCart());
        navigate(`/order-placed/${result.orderId}`, { replace: true });
      } else {
        const result = await createCheckoutSession(orderData).unwrap();
        window.location.assign(result.url);
      }
    } catch (error) {
      setServerError(
        error.data?.message ||
          "We couldn't place your order. Please try again.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-5 px-4"
        style={{ background: "var(--bg-primary)" }}
      >
        <ShoppingBag className="text-blue-500" size={44} aria-hidden="true" />
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Your cart is empty
        </h1>
        <Link
          to="/products"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div
      className="mx-auto min-h-screen max-w-6xl px-4 py-10"
      style={{ background: "var(--bg-primary)" }}
    >
      {isSubmitting && <CheckoutLoader paymentMethod={paymentMethod} />}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Secure checkout
        </p>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Complete your order
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          Choose how to pay after entering your delivery details.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <div className="space-y-7 lg:col-span-2">
          <section
            className="rounded-2xl border p-6 shadow-sm"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2
              className="mb-5 text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Shipping information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.name === "address" ? "sm:col-span-2" : undefined
                  }
                >
                  <CheckoutField
                    field={field}
                    register={register}
                    error={errors[field.name]}
                  />
                </div>
              ))}
            </div>
          </section>

          <fieldset
            className="rounded-2xl border p-6 shadow-sm"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <legend
              className="px-1 text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Payment method
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "card",
                  title: "Pay by card",
                  detail: "Secure checkout with Stripe",
                  icon: CreditCard,
                },
                {
                  value: "cash_on_delivery",
                  title: "Cash on delivery",
                  detail: "Pay when your order arrives",
                  icon: Banknote,
                },
              ].map(({ value, title, detail, icon: Icon }) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition hover:border-blue-400"
                  style={{
                    borderColor:
                      paymentMethod === value
                        ? "#2563eb"
                        : "var(--border-color)",
                    background:
                      paymentMethod === value
                        ? "rgba(37, 99, 235, 0.08)"
                        : "var(--bg-card)",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="mt-1 accent-blue-600"
                  />
                  <Icon
                    size={22}
                    className="mt-0.5 shrink-0 text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <span
                      className="block font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {title}
                    </span>
                    <span
                      className="block text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {detail}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside
          className="h-fit rounded-2xl border p-6 shadow-sm"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2
            className="mb-5 text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Order summary
          </h2>
          <div className="mb-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={getProductImage(item)}
                  onError={useProductImageFallback}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Qty {item.quantity}
                  </p>
                </div>
                <ProductPrice
                  product={item}
                  quantity={item.quantity}
                  size="sm"
                  showPercent={false}
                  className="shrink-0 justify-end"
                />
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-between border-t pt-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <span style={{ color: "var(--text-secondary)" }}>
              Total · {totalQuantity} items
            </span>
            <strong className="text-2xl text-blue-600">
              ${totalPrice.toFixed(2)}
            </strong>
          </div>
          <p
            className="mt-3 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Final prices and stock are verified before your order is placed.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? (
              <LoaderCircle
                size={20}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : paymentMethod === "cash_on_delivery" ? (
              <Banknote size={20} aria-hidden="true" />
            ) : (
              <CreditCard size={20} aria-hidden="true" />
            )}
            {isSubmitting
              ? "Processing..."
              : paymentMethod === "cash_on_delivery"
                ? "Place cash order"
                : "Continue to secure payment"}
          </button>
          <Link
            to="/cart"
            className="mt-4 block text-center text-sm hover:text-blue-600"
            style={{ color: "var(--text-secondary)" }}
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;
