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

export const itemDonationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createItemDonation: builder.mutation({
      query: (formData) => ({
        url: "/item-donation",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),

    getItemDonations: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/item-donation/all${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemDonation],
    }),

    getMyDonations: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/item-donation/my${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.itemDonation],
    }),

    getSingleItemDonation: builder.query({
      query: (id: string) => ({
        url: `/item-donation/${id}`,
        method: "GET",
      }),
    }),

    updateItemDonation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/item-donation/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.itemDonation],
    }),

    deleteItemDonation: builder.mutation({
      query: (id: string) => ({
        url: `/item-donation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.itemDonation],
    }),
  }),
});

export const {
  useCreateItemDonationMutation,
  useGetItemDonationsQuery,
  useGetSingleItemDonationQuery,
  useUpdateItemDonationMutation,
  useDeleteItemDonationMutation,
  useGetMyDonationsQuery,
} = itemDonationApi;
