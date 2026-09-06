import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "users",
    }),
    addUser: build.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = authApiSlice;
export default authApiSlice;
