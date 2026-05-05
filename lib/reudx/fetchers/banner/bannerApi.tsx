import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

const buildQuery = (params?: PaginationParams) => {
  if (!params) return "";
  const sp = new URLSearchParams();
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  if (params.search) sp.set("search", params.search);
  const q = sp.toString();
  return q ? `?${q}` : "";
};

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // CREATE BANNER
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/banner",
        method: "POST",
        body: data, // FormData (photo upload)
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    // GET ALL BANNERS (with optional pagination + search)
    getBanners: builder.query<any, PaginationParams | Record<string, never>>({
      query: (params) => ({
        url: `/banner/all${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),

    // GET SINGLE BANNER
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),

    // UPDATE BANNER
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/banner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    // DELETE BANNER
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),

  }),
});

export const {
  useCreateBannerMutation,
  useGetBannersQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
