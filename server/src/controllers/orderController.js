import Order from "../models/Order.js";

// إنشاء أوردر جديد
const createOrder = async (req, res) => {
  try {
    // req.body فيه بيانات الأوردر الجاية من الـ Frontend
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// جلب كل الأوردرات
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createOrder, getOrders };
