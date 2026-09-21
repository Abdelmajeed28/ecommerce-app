import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./src/routes/products.js";
import authRouter from "./src/routes/auth.js";
import ordersRouter from "./src/routes/orders.js";
import userRouter from "./src/routes/user.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is runnig" });
});

const PORT = process.env.PORT || 500;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected ... ");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
