import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// POST /api/auth/register → تسجيل يوزر جديد
router.post("/register", register);

// POST /api/auth/login → تسجيل الدخول
router.post("/login", login);

export default router;
