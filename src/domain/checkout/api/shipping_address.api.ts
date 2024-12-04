import { api } from "@/apis/api";

interface ShippingAddress {
  id: string;
  userId: string;
  streetAddress: string;
  fullName: string;
  city: string;
  state: string;
  phoneNumber: string | null;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export const shippingAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShippingAddresses: builder.query<ShippingAddress[], void>({
      query: () => "shipping-addresses",
      providesTags: ["ShippingAddress"],
    }),
    createShippingAddress: builder.mutation<
      ShippingAddress,
      Partial<ShippingAddress>
    >({
      query: (addressData) => ({
        url: "shipping-addresses",
        method: "POST",
        body: addressData,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
    updateShippingAddress: builder.mutation<
      ShippingAddress,
      Partial<ShippingAddress>
    >({
      query: (addressData) => ({
        url: `shipping-addresses/${addressData.id}`,
        method: "PATCH",
        body: addressData,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
  }),
});

export const {
  useGetShippingAddressesQuery,
  useCreateShippingAddressMutation,
  useUpdateShippingAddressMutation,
} = shippingAddressApi;
