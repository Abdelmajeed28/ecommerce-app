import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
    }),
    getProductById: build.query({
      query: (id) => `products/${id}`,
    }),
    addOrder: build.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddOrderMutation,
} = productsApiSlice;
