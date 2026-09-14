import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // مينفعش يكون في أكتر من user بنفس الإيميل
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// pre("save") ده middleware بيتنفذ تلقائياً قبل ما نحفظ أي user
// بنستخدمه عشان نشفر الـ password قبل الحفظ
userSchema.pre("save", async function (next) {
  // لو الـ password مش اتغير (مثلاً لو بنعدل الاسم بس)
  // منشفرش تاني عشان هيبظ الـ password المشفر
  if (!this.isModified("password")) return next();

  // بنشفر الـ password، الـ 10 دي الـ salt rounds (كلما زادت كلما زاد الأمان والوقت)
  this.password = await bcrypt.hash(this.password, 10);

  // بنقول للـ middleware إنه خلص وممكن يكمل
  next();
});

export default mongoose.model("User", userSchema);
