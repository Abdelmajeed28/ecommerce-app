import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./src/routes/products.js";
import authRouter from "./src/routes/auth.js";
import ordersRouter from "./src/routes/orders.js";
import userRouter from "./src/routes/user.js";
import cookieParser from "cookie-parser";
import { stripeWebhookHandler } from "./src/controllers/orderController.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, //"http://localhost:5173"
    credentials: true,
  }),
);
//  جديد ومهم جداً: الـ webhook route لازم يتسجل هنا، قبل app.use(express.json())
// السبب: Stripe بيتحقق من توقيع الطلب باستخدام الـ raw body (البيانات الخام
// قبل أي تحويل)، لكن express.json() بيحول أي body وارد لـ JaScript object
// تلقائياً. لو سبقنا الـ webhook بـ express.json()، هيتحول الـ body قبل ما
// يوصل للـ handler بتاعنا، وبكده التحقق من التوقيع هيفشل دايماً.
// express.raw() هنا بيقول لـ Express: "الـ route ده بس، سيب البيانات زي ما هي خام"
app.post(
  "/api/orders/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler,
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is runnig" });
});
//  جديد: بنخزّن حالة الاتصال عشان منكررش الاتصال بقاعدة البيانات في كل استدعاء
// مهم جدًا في بيئة Serverless لأن كل request ممكن يشغّل نسخة جديدة من الكود
let isConnected = false;

// const PORT = process.env.PORT || 500;
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("MongoDB Connected ... ");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));
const connectDB = async () => {
  if (isConnected) return; // لو متصل بالفعل، منعملش حاجة
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("MongoDB Connected ...");
};

//  جديد: middleware بسيط بيتأكد من الاتصال بقاعدة البيانات قبل أي request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

//  تعديل: app.listen بيشتغل بس وقت التطوير المحلي (مش على Vercel)
// على Vercel، الملف بيتصدّر كـ handler والمنصة هي اللي بتستدعيه مباشرة
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

//  جديد: بنصدّر الـ app عشان @vercel/node يقدر يستخدمه كـ serverless function
export default app;
