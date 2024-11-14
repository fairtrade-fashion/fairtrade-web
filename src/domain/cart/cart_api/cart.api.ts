import { api } from "@/apis/api";
import { CartItem, CartRemove, CartRoot } from "@/models/response/cartI_items";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrCreateCart: builder.query<CartRoot, string>({
      query: () => ({
        method: "GET",
        url: `carts`,
      }),
      transformResponse: (response: CartRoot) => response,
      providesTags: ["Cart"],
    }),

    addItemToCart: builder.mutation<
      CartItem,
      { cartId: string; productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        method: "POST",
        url: `carts/add`,
        body: { productId, quantity },
      }),
      transformResponse: (response: CartItem) => response,
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeItemFromCart: builder.mutation<
      CartRemove,
      { id: string }
    >({
      query: ({ id }) => ({
        method: "DELETE",
        url: `carts/item/${id}`,
      }),
      transformResponse: (): CartRemove => ({
        message: "Item removed successfully",
        id: ""
      }),
      invalidatesTags: ["Cart"],
    }),

    // Define more endpoints as needed, e.g., get total, etc.
  }),
});

export const {
  useGetOrCreateCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation, // Export the hook for removing items
} = cartApi;
