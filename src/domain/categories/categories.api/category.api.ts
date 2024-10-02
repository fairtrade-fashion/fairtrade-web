// import { api } from "@/apis/api";
// import {
//   CategoryProductsRoot,
//   CategoryRoot,
// } from "@/models/response/category.model";

// export const categoryApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchCategory: builder.query<CategoryRoot, void>({
//       query: () => ({
//         providesTags: ["Category"],
//         method: "GET",
//         url: "categories",
//       }),
//       transformResponse: (response: CategoryRoot) => {
//         return response;
//       },
//     }),

//     // Fetch a category by ID
//     fetchCategoryProducts: builder.query<CategoryProductsRoot, string>({
//       query: (categoryId) => ({
//         providesTags: ["CategoryId"],
//         method: "GET",
//         url: `categories/${categoryId}/products`,
//       }),
//       transformResponse: (response: CategoryProductsRoot) => {
//         return response;
//       },
//     }),
//   }),
// });
// export const { useFetchCategoryQuery, useFetchCategoryProductsQuery } =
//   categoryApi;





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
        categoryId: string;
        minPrice?: number;
        maxPrice?: number;
        sizes?: string[];
      }
    >({
      query: ({ categoryId, minPrice, maxPrice, sizes }) => {
        let url = `categories/${categoryId}/products`;

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
