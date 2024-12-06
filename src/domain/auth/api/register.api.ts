// src/slices/registerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/config/url";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
