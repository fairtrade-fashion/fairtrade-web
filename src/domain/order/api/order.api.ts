import { api } from "@/apis/api";
import { OrderBegin } from "@/models/response/order.model";

// Inject endpoints into the existing API
export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrder: builder.query<OrderBegin, void>({
      query: () => ({
        providesTags: ["Order"],
        method: "GET",
        url: "orders/user/orders",
      }),
      transformResponse: (response: OrderBegin) => {
        return response;
      },
    }),
  }),
});

export const { useFetchOrderQuery } =
  orderApi;
