import { Router } from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// Router بيخلينا نعمل routes منفصلة لكل feature
// بدل ما نحط كل الـ routes في server.js
const router = Router();

// GET /api/products → جلب كل المنتجات
router.get("/", getProducts);

// GET /api/products/:id → جلب منتج واحد بالـ id
// الـ :id ده dynamic parameter زي ما عملنا في React Router
router.get("/:id", getProductById);

export default router;
