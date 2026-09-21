import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: build.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getUserData: build.query({
      query: () => "user",
    }),
    updateCart: build.mutation({
      query: (cartItems) => ({
        url: "user/cart",
        method: "PUT",
        body: { cartItems },
      }),
    }),
    updateWishlist: build.mutation({
      query: (wishlistItems) => ({
        url: "user/wishlist",
        method: "PUT",
        body: { wishlistItems },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyGetUserDataQuery,
  useUpdateCartMutation,
  useUpdateWishlistMutation,
} = authApiSlice;
export default authApiSlice;
