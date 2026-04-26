import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE CAMPAIGN
    createCampaign: builder.mutation({
      query: (formData) => ({
        url: "/campaign",
        method: "POST",
        body: formData,
      }),
    }),

    // GET ALL CAMPAIGNS
    getCampaigns: builder.query({
      query: (params) => ({
        url: "/campaign",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.campaign],
    }),

    // GET SINGLE CAMPAIGN
    getSingleCampaign: builder.query({
      query: (id) => ({
        url: `/campaign/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.campaign],
    }),

    // UPDATE CAMPAIGN
    updateCampaign: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/campaign/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),

    // DELETE CAMPAIGN
    deleteCampaign: builder.mutation({
      query: (id) => ({
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