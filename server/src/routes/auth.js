import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/register", authLimiter, register);

router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
