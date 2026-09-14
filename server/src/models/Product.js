// استيراد mongoose عشان نعمل Schema وModel
import mongoose from "mongoose";

// الـ Schema بيحدد شكل الـ Document في الـ Database
// يعني كل product هيكون فيه الـ fields دي
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // مش ممكن يتحفظ product من غير title
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // الصورة الرئيسية اللي بتتعرض في الـ ProductCard
    image: {
      type: String,
      required: true,
    },
    // مصفوفة الصور للـ Gallery في صفحة التفاصيل
    images: [{ type: String }],
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0, // لو مش موجود بيبدأ بـ 0
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    // بيضيف تلقائياً createdAt وUpdatedAt لكل document
    timestamps: true,
  },
);

// بنعمل Model من الـ Schema
// "Product" ده اسم الـ Collection في MongoDB (هيبقى "products" تلقائياً)
export default mongoose.model("Product", productSchema);
