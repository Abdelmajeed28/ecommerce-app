import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // مصفوفة المنتجات اللي في الأوردر
    items: [
      {
        // الـ id بتاع المنتج في MongoDB
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // ref بيقول إن الـ id ده بيرجع لـ Product model
        },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    // بيانات الشحن اللي المستخدم بيكتبها في صفحة الـ Checkout
    shippingInfo: {
      name: String,
      email: String,
      address: String,
      city: String,
    },
    // الـ user اللي عمل الأوردر
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      // الأوردر بيبدأ بـ pending وبعدين ممكن يتغير
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
