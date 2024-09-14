import { api } from "@/apis/api";
import { ProductData, ProductRoot } from "@/models/response/product.model";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchProduct: builder.query<ProductRoot, void>({
      query: () => ({
        providesTags: ["Product"],
        method: "GET",
        url: "products",
      }),
      transformResponse: (response: ProductRoot) => {
        return response;
      },
    }),

    // Fetch a category by ID
    fetchProductId: builder.query<ProductData, string>({
      query: (productId) => ({
        method: "GET",
        url: `products/${productId}`,
      }),
      transformResponse: (response: ProductData) => {
        return response;
      },
      providesTags: ["ProductId"],
    }),
  }),
});
export const { useFetchProductQuery, useFetchProductIdQuery } = productApi;
