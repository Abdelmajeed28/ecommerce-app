import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { productsApiSlice } from "../features/products/productsApiSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});
export default store;
