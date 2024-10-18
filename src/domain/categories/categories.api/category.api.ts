import { api } from "@/apis/api";
import {
  CategoryProductsRoot,
  CategoryRoot,
} from "@/models/response/category.model";

// Inject endpoints into the existing API
export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategory: builder.query<CategoryRoot, void>({
      query: () => ({
        providesTags: ["Category"],
        method: "GET",
        url: "categories",
      }),
      transformResponse: (response: CategoryRoot) => {
        return response;
      },
    }),

    // Fetch category products with optional filters for price and size
    fetchCategoryProducts: builder.query<
      CategoryProductsRoot,
      {
        id: string;
        minPrice?: number;
        maxPrice?: number;
        sizes?: string[];
      }
    >({
      query: ({ id, minPrice, maxPrice, sizes }) => {
        let url = `categories/${id}`;

        // Add query parameters for price range and sizes if provided
        const params = new URLSearchParams();
        if (minPrice !== undefined)
          params.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          params.append("maxPrice", maxPrice.toString());
        if (sizes && sizes.length > 0) params.append("sizes", sizes.join(","));

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          providesTags: ["CategoryId"],
          method: "GET",
          url,
        };
      },
      transformResponse: (response: CategoryProductsRoot) => {
        return response;
      },
    }),
  }),
});

export const { useFetchCategoryQuery, useFetchCategoryProductsQuery } =
  categoryApi;
