import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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
    }),
    getProductById: build.query({
      query: (id) => `products/${id}`,
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
    }),
    getCategoriesWithImage: build.query({
      query: () => "products/categories-with-image",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddOrderMutation,
  useGetCategoriesWithImageQuery,
} = productsApiSlice;
