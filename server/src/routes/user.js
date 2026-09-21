import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  getUserData,
  updateCart,
  updateWishlist,
} from "../controllers/userController.js";

const router = Router();

router.get("/", protect, getUserData);
router.put("/cart", protect, updateCart);
router.put("/wishlist", protect, updateWishlist);

export default router;
