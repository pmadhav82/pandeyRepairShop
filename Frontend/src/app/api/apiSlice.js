import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["Note", "User"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://pandeyrepairshop-1.onrender.com", credentials:"include"}),
  endpoints: (builder) => ({}),
});
