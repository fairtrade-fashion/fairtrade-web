import { ProfileRoot } from "@/models/response/profile.model";
import { api } from "@/apis/api"; // Ensure you import your base API correctly

// Add this to your existing api file
export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchProfile: builder.query<ProfileRoot, void>({
      query: () => {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        return {
          url: "auth/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        };
      },
      providesTags: ["Profile"],
      transformResponse: (response: ProfileRoot) => {
        return response; // Transform response if needed, otherwise just return
      },
    }),
  }),
  overrideExisting: false, // Ensure you're not overriding existing endpoints
});

// Export the auto-generated hook for the `fetchProfile` query
export const { useFetchProfileQuery } = profileApi;
