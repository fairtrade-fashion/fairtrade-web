import { api } from "@/apis/api";
import { storeToken } from "@/config/token";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: { token: string }) => {
        storeToken("access_token", response.token);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
