// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// const createOrder = async (req, res) => {
//   try {
//     const { items } = req.body;
//     // نتحقق من كل منتج قبل ما نأكد الطلب
//     for (const orderItem of items) {
//       const product = await Product.findById(orderItem.id);
//       if (!product) {
//         return res
//           .status(404)
//           .json({ message: `Product not found: ${orderItem.id}` });
//       }
//       if (product.stock < orderItem.quantity) {
//         return res.status(400).json({
//           message: `Not enough stock for "${product.title}". Only ${product.stock} left.`,
//         });
//       }
//     }

//     // نقلل الـ stock بعد التأكد إن كل حاجة متاحة
//     for (const orderItem of items) {
//       await Product.findByIdAndUpdate(orderItem.id, {
//         $inc: { stock: -orderItem.quantity },
//       });
//     }
//     const order = await Order.create({ ...req.body, user: req.user.id });
//     res.status(201).json(order);
//   } catch (error) {
//     console.error("createOrder", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export { createOrder, getOrders };
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";
// ✅ مهم جداً: بننشئ الـ Stripe instance جوه دالة، مش على مستوى الملف مباشرة
// السبب: زي ما حصل قبل كده مع Resend، الـ imports في ES Modules بتتنفذ قبل
// dotenv.config()، فلو عملنا "new Stripe(...)" هنا فوق، الـ STRIPE_SECRET_KEY
// هتكون لسه undefined وقت التحميل. عشان كده بنأجل إنشاء الـ instance لحد
// لحظة الاستخدام الفعلي جوه كل دالة.
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

// ============================================
// 1) إنشاء جلسة الدفع (بتتنادى لما اليوزر يدوس "Confirm Order")
// ============================================
const createCheckoutSession = async (req, res) => {
  try {
    const { items, shippingInfo, totalPrice, totalQuantity } = req.body;

    // بنتحقق من توفر كل منتج قبل حتى ما نبدأ عملية الدفع
    // (زي ما كنا بنعمل قبل كده، بس هنا التحقق بس، من غير خصم فعلي للـ stock)
    for (const orderItem of items) {
      const product = await Product.findById(orderItem.id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${orderItem.id}` });
      }
      if (product.stock < orderItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for "${product.title}". Only ${product.stock} left.`,
        });
      }
    }
    const formattedItems = items.map((item) => ({
      productId: item.id, // ✏️ التحويل الأساسي: id (من الفرونت) → productId (في الـ DB)
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));
    // بننشئ الطلب في قاعدة البيانات فوراً، لكن بحالة "لسه مدفوعش"
    // ده الطلب اللي هيظهر في صفحة "My Orders" حتى لو الدفع اتلغى أو فشل
    const order = await Order.create({
      items: formattedItems,
      shippingInfo,
      totalPrice,
      totalQuantity,
      user: req.user.id, // بنربطه باليوزر المسجل دخول من التوكن، مش من الفرونت
      paymentStatus: "unpaid",
    });

    const stripe = getStripe();

    // بنبني الـ line_items: دي الصيغة اللي Stripe عايزة بيها تفاصيل المنتجات
    // عشان تعرضها لليوزر في صفحة الدفع بتاعتها
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd", // العملة - لازم تكون مدعومة في حسابك
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [], // Stripe محتاجة رابط صورة صالح (https)، مش base64
        },
        unit_amount: Math.round(item.price * 100), // Stripe بتتعامل بالسنت مش الدولار، فلازم نضرب في 100
      },
      quantity: item.quantity,
    }));

    // بننشئ جلسة الدفع فعلياً عند Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // دفعة واحدة، مش اشتراك متكرر
      payment_method_types: ["card"],
      line_items,
      // بعد نجاح الدفع، Stripe هيحول اليوزر هنا، ومعاها session_id في الـ query
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      // لو اليوزر لغى الدفع أو رجع بره، هيتحول هنا
      cancel_url: `${process.env.CLIENT_URL}/order-cancel`,
      customer_email: shippingInfo.email, // Stripe هيملأ الإيميل تلقائياً في فورم الدفع
      // ✅ الجزء الأهم: بنمرر ID الطلب بتاعنا كـ metadata
      // ده اللي هيوصلنا تاني في الـ webhook عشان نعرف نربط الدفع بالطلب الصح
      metadata: {
        orderId: order._id.toString(),
      },
    });

    // بنخزن الـ session id في الطلب، عشان نقدر نتتبعه لو احتجنا لاحقاً
    order.stripeSessionId = session.id;
    await order.save();

    // بنرجع للفرونت بس رابط صفحة الدفع، هو هيوديه ليها مباشرة
    res.status(201).json({ url: session.url });
  } catch (error) {
    console.error("createCheckoutSession", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// 2) الـ Webhook - بتستقبله Stripe مباشرة، مش الفرونت بتاعنا
// ============================================
const stripeWebhookHandler = async (req, res) => {
  const stripe = getStripe();
  const signature = req.headers["stripe-signature"]; // توقيع Stripe المرفق مع كل webhook

  let event;
  try {
    // بنتحقق إن الطلب ده جاي فعلاً من Stripe ومش مزور
    // req.body هنا لازم يكون raw buffer مش JSON متحول، عشان التحقق من التوقيع يشتغل صح
    // (هنظبط ده في server.js في الخطوة الجاية)
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // بنهتم بس بحدث "الجلسة اكتملت بنجاح"
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId; // الـ ID اللي بعتناه قبل كده

    try {
      const order = await Order.findById(orderId);

      // ✅ حماية من التكرار (idempotency): لو Stripe بعتت نفس الحدث مرتين
      // (وده بيحصل أحياناً)، منخصمش الـ stock مرتين
      if (!order || order.paymentStatus === "paid") {
        return res.json({ received: true });
      }

      // دلوقتي بس، وبعد التأكد الحقيقي من الدفع، بنخصم الـ stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }

      order.paymentStatus = "paid";
      await order.save();
      await User.findByIdAndUpdate(order.user, { cartItems: [] });
    } catch (err) {
      console.error("Error processing webhook order update:", err);
    }
  }

  // لازم نرد بـ 200 دايماً لـ Stripe عشان تعرف إن الحدث وصل واتعالج
  res.json({ received: true });
};

// ============================================
// 3) جلب طلبات اليوزر (زي ما كانت بالظبط، من غير تغيير)
// ============================================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createCheckoutSession, stripeWebhookHandler, getOrders };
