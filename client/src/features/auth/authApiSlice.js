import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
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
    logoutUser: build.mutation({
      query: () => ({ url: "auth/logout", method: "POST" }),
    }),
    getMe: build.query({
      query: () => "auth/me",
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
  useLogoutUserMutation,
  useLazyGetMeQuery,
  useLazyGetUserDataQuery,
  useUpdateCartMutation,
  useUpdateWishlistMutation,
} = authApiSlice;
export default authApiSlice;
