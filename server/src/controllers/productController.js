// استيراد الـ Product model عشان نتعامل مع المنتجات في الـ Database
import Product from "../models/Product.js";

// جلب كل المنتجات
const getProducts = async (req, res) => {
  try {
    // Product.find() بترجع كل الـ documents في الـ products collection
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// جلب منتج واحد بالـ id
const getProductById = async (req, res) => {
  try {
    // req.params.id هو الـ id اللي جاي في الـ URL زي /api/products/123
    // findById بتدور على الـ document اللي عنده نفس الـ id ده
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getProducts, getProductById };
