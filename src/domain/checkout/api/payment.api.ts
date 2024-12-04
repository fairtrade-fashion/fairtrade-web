import { api } from "@/apis/api";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<string, string>({
      query: (shippingAddressId) => ({
        url: `payments/initiate/${shippingAddressId}`,
        method: "POST",
      }),
      transformResponse: (response: string) => {
        console.log("Transforming response:", response);
        return JSON.parse(response);
      },
    }),
    verifyPayment: builder.query<unknown, void>({
      query: () => "payments/verify",
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentQuery } = paymentApi;
