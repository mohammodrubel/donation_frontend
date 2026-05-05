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

    getCampaigns: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/campaign/all${buildQuery(params)}`,
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

    completeCampaign: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/campaign/${id}/complete`,
        method: "PATCH",
        body: data,
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
  useCompleteCampaignMutation,
} = campaignApi;
