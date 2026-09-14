import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// دالة بتعمل JWT token للـ user
// بنفصلها عشان بنستخدمها في register وlogin
const generateToken = (user) => {
  return jwt.sign(
    // الـ payload: البيانات اللي هتتحفظ جوا الـ token
    { id: user._id, name: user.name, email: user.email },
    // الـ secret key من الـ .env عشان نأمن الـ token
    process.env.JWT_SECRET,
    // الـ token هينتهي بعد 7 أيام
    { expiresIn: "7d" },
  );
};

// تسجيل يوزر جديد
const register = async (req, res) => {
  try {
    // بنجيب البيانات من الـ request body
    const { name, email, password } = req.body;

    // بنتحقق إن الإيميل مش موجود في الـ Database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // بنعمل الـ user الجديد، الـ password هيتشفر تلقائياً عن طريق الـ pre save hook
    const user = await User.create({ name, email, password });

    // بنعمل token للـ user الجديد عشان يدخل تلقائياً بعد التسجيل
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// تسجيل الدخول
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // بندور على الـ user بالإيميل
    const user = await User.findOne({ email });
    if (!user) {
      // بنرجع نفس الرسالة للحالتين عشان مننورش الـ hacker
      // إن الإيميل موجود أو لأ
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // bcrypt.compare بتقارن الـ password العادي بالـ password المشفر
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { register, login };
