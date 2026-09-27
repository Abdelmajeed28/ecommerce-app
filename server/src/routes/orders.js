import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

export default router;
