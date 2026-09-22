import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // const existingItem = state.items.find(
      //   (item) => item.id === action.payload.id,
      // );
      // if (existingItem) {
      //   existingItem.quantity += action.payload.quantity || 1;
      // } else {
      //   state.items.push({
      //     ...action.payload,
      //     quantity: action.payload.quantity || 1,
      //   });
      // }
      // state.totalQuantity += action.payload.quantity || 1;
      // state.totalPrice = parseFloat(
      //   (
      //     state.totalPrice +
      //     action.payload.price * (action.payload.quantity || 1)
      //   ).toFixed(2),
      // );
      const payload = action.payload;
      const requestedQty = payload.quantity || 1;
      const stock = payload.stock ?? Infinity; //  جديد: لو مفيش stock نعتبره غير محدود (حماية من undefined)

      const existingItem = state.items.find((item) => item.id === payload.id);
      const currentQty = existingItem ? existingItem.quantity : 0;

      //  جديد: نحسب أقصى كمية ممكن نضيفها فعلياً من غير ما نتخطى الـ stock
      const maxAddable = Math.max(stock - currentQty, 0);
      const qtyToAdd = Math.min(requestedQty, maxAddable);

      if (qtyToAdd <= 0) return; //  جديد: مفيش مكان نضيف فيه، وصلنا للحد الأقصى بالفعل

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({ ...payload, quantity: qtyToAdd });
      }

      state.totalQuantity += qtyToAdd; //  تعديل: بنستخدم qtyToAdd مش payload.quantity مباشرة
      state.totalPrice = parseFloat(
        (state.totalPrice + payload.price * qtyToAdd).toFixed(2),
      );
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice = parseFloat(
          (state.totalPrice - item.price * item.quantity).toFixed(2),
        );
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      // const { id, quantity } = action.payload;
      // const item = state.items.find((item) => item.id === id);
      // if (item) {
      //   const diff = quantity - item.quantity;
      //   state.totalQuantity += diff;
      //   state.totalPrice = parseFloat(
      //     (state.totalPrice + item.price * diff).toFixed(2),
      //   );
      //   item.quantity = quantity;
      // }
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const maxQty = item.stock ?? Infinity; //  جديد
        const cappedQuantity = Math.min(Math.max(quantity, 1), maxQty); //  جديد: منع النزول تحت 1 أو الصعود فوق الـ stock
        const diff = cappedQuantity - item.quantity;
        state.totalQuantity += diff;
        state.totalPrice = parseFloat(
          (state.totalPrice + item.price * diff).toFixed(2),
        );
        item.quantity = cappedQuantity; //  تعديل: بنستخدم القيمة المحدودة
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (sum, i) => sum + i.quantity,
        0,
      );
      state.totalPrice = parseFloat(
        action.payload
          .reduce((sum, i) => sum + i.price * i.quantity, 0)
          .toFixed(2),
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
