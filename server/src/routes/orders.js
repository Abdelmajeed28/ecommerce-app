import { Router } from "express";
import {
  createCheckoutSession,
  getOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

router.get("/", protect, getOrders);

export default router;
