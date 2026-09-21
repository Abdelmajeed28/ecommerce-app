import mongoose from "mongoose";
import bcryptJs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlistItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        price: Number,
        image: String,
        images: [String],
        category: String,
        rating: Number,
        stock: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcryptJs.genSalt(12);
  this.password = await bcryptJs.hash(this.password, salt);
  return;
});

userSchema.methods.comparePass = function (newPassword) {
  return bcryptJs.compare(newPassword, this.password);
};
export default mongoose.model("User", userSchema);
