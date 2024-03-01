import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["Note", "User"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000", credentials:"include"}),
  endpoints: (builder) => ({}),
});
