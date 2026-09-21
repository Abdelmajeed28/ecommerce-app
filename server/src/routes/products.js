import { Router } from "express";
import {
  getProducts,
  getProductById,
  getCategories,
  getCategoriesWithImage,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/categories-with-image", getCategoriesWithImage);
router.get("/:id", getProductById);

export default router;
