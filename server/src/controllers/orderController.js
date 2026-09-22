import Order from "../models/Order.js";
import Product from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    // نتحقق من كل منتج قبل ما نأكد الطلب
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

    // نقلل الـ stock بعد التأكد إن كل حاجة متاحة
    for (const orderItem of items) {
      await Product.findByIdAndUpdate(orderItem.id, {
        $inc: { stock: -orderItem.quantity },
      });
    }
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createOrder, getOrders };
