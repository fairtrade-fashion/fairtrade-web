import { api } from "@/apis/api";
import { NewArrivalModel } from "@/models/response/new_arrival.model";

// Inject endpoints into the existing API
export const newArrivalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchNewArrival: builder.query<NewArrivalModel[], void>({
      query: () => ({
        url: "products/new-arrivals",
        method: "GET",
      }),
      transformResponse: (response: NewArrivalModel[]): NewArrivalModel[] => {
        return response.map((product) => ({
          ...product,
          images: product.images.map((image, index) => ({
            id: `image-${index}`,
            url: image.url,
            productId: product.id,
          })),
        }));
      },
      providesTags: ["NewArrival"],
    }),
  }),
});

export const { useFetchNewArrivalQuery } = newArrivalApi;
