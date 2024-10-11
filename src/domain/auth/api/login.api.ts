import { axiosBaseQuery } from "@/apis/custom.base.query";
import { storeToken } from "@/config/token";
import { BASE_URL } from "@/config/url";
import { LoginValue } from "@/models/request/login_value.model";
import { LoginRoot } from "@/models/response/login.model";
import { createApi } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginRoot, LoginValue>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      // Handle the response to store the token
      transformResponse: (response: LoginRoot) => {
        if (response.access_token) {
          storeToken("access_token", response.access_token);
        }
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = loginApi;
