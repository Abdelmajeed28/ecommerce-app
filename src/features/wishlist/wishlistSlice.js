import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlistItems: [] },
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const exist = state.wishlistItems.some((item) => item.id === newItem.id);
      if (!exist) {
        state.wishlistItems.push(newItem);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const index = state.wishlistItems.findIndex((i) => i.id === item.id);

      if (index >= 0) {
        state.wishlistItems.splice(index, 1);
      } else {
        state.wishlistItems.push(item);
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
