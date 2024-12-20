import { fetchToken } from "@/config/token";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "//https://fairtrade-server.onrender.com/api/v2/", //https://fairtrade-server.onrender.com/api/v2/
  prepareHeaders: (headers) => {
    const token = fetchToken("access_token");
    // console.log("Fetched Token:", token);
    const authHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    Object.entries(authHeaders).forEach(([key, value]) => {
      headers.set(key, value as string);
    });
    return headers;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "Category",
    "CategoryId",
    "Product",
    "ProductId",
    "Profile",
    "Cart",
    "CartID",
    "ShippingAddress",
    "NewArrival",
  ],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => "test",
  }),
});
