import { api } from "@/apis/api";
import { ShippingAddressResponse } from "@/models/response/shipping_address";

// Inject endpoints into the existing API
export const shippingAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createShippingAddress: builder.mutation<
      ShippingAddressResponse,
      Partial<ShippingAddressResponse>
    >({
      query: (addressData) => ({
        url: "shipping-address",
        method: "POST",
        body: addressData,
      }),
      transformResponse: (response: ShippingAddressResponse) => response,
      invalidatesTags: ["ShippingAddress"],
    }),
  }),
});

export const { useCreateShippingAddressMutation } = shippingAddressApi;
