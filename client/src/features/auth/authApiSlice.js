import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  // endpoints: (build) => ({
  //   getUsers: build.query({
  //     query: () => "users",
  //   }),
  //   addUser: build.mutation({
  //     query: (newUser) => ({
  //       url: "users",
  //       method: "POST",
  //       body: newUser,
  //     }),
  //   }),
  // }),
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
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApiSlice;
export default authApiSlice;
