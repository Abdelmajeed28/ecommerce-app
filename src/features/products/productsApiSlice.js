import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "products",
    }),
    getProductById: build.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
