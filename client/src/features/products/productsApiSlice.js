import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProducts: build.query({
      // query: () => "products",
      query: ({ category, search, page, limit, sort } = {}) => {
        const params = new URLSearchParams();
        if (category && category !== "all") params.append("category", category);
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sort) params.append("sort", sort);
        return `products?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductById: build.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getCategories: build.query({
      query: () => "products/categories",
    }),
    addOrder: build.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Product"],
    }),
    getCategoriesWithImage: build.query({
      query: () => "products/categories-with-image",
    }),
    getRelatedProducts: build.query({
      query: (id) => `products/${id}/related`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddOrderMutation,
  useGetCategoriesWithImageQuery,
  useGetRelatedProductsQuery,
} = productsApiSlice;
