import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
    shippingInfo: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    // status بيتحكم فيه الأدمن لاحقاً (لسه بيجهز الطلب، شحنه، وصل)
    // paymentStatus بيتحكم فيه Stripe وحده عن طريق الـ webhook
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
    //  جديد: بنخزن هنا الـ ID بتاع جلسة الدفع في Stripe
    // ده اللي بيربط بين الطلب في قاعدة بياناتنا والدفع الفعلي عند Stripe
    stripeSessionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
