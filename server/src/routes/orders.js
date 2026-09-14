import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = Router();

// POST /api/orders → إنشاء أوردر جديد
router.post("/", createOrder);

// GET /api/orders → جلب كل الأوردرات
router.get("/", getOrders);

export default router;
