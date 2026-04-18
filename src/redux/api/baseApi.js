import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token; // from redux state

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
   tagTypes: ["AllPayments", "Users", "Auth","Tasks","Offer","Banner"],
  endpoints: () => ({}),
});