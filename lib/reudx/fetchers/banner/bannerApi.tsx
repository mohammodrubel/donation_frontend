import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

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

    // GET ALL BANNERS
    getBanners: builder.query({
      query: () => ({
        url: "/banner/all",
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
        body: data, // FormData or JSON
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