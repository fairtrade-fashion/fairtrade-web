import { ProfileRoot } from "@/models/response/profile.model";
import { api } from "@/apis/api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchProfile: builder.query<ProfileRoot, void>({
      query: () => {
        const token = localStorage.getItem("access_token");

        return {
          url: "auth/profile",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
      providesTags: ["Profile"],
      transformResponse: (response: ProfileRoot) => {
        return response;
      },
    }),
  }),
  overrideExisting: false, 
});

export const { useFetchProfileQuery } = profileApi;
