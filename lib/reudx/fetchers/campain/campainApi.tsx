import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCampaign: builder.mutation({
      query: (formData) => ({
        url: "/campaign",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),

    getCampaigns: builder.query({
      query: () => ({
        url: "/campaign/all",
        method: "GET",
      }),
      providesTags: [tagTypes.campaign],
    }),

    getSingleCampaign: builder.query({
      query: (id: string) => ({
        url: `/campaign/${id}`,
        method: "GET",
      }),
    }),

    updateCampaign: builder.mutation({
      query: ({ id, data }) => ({
        url: `/campaign/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),

    deleteCampaign: builder.mutation({
      query: (id: string) => ({
        url: `/campaign/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.campaign],
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useGetCampaignsQuery,
  useGetSingleCampaignQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignApi;