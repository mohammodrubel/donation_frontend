import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

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

    getItemDonations: builder.query({
      query: () => ({
        url: "/item-donation/all",
        method: "GET",
      }),
      providesTags: [tagTypes.itemDonation],
    }),
    getMyDonations: builder.query({
      query: () => ({
        url: "/item-donation/my",
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
  useGetMyDonationsQuery
} = itemDonationApi;