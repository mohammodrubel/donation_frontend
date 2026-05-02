import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create donation (Stripe checkout)
    createDonation: builder.mutation({
      query: (data) => ({
        url: "/donation/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.donation],
    }),

    // ✅ Get all donations (admin)
    getDonations: builder.query({
      query: () => ({
        url: "/donation/all",
        method: "GET",
      }),
      providesTags: [tagTypes.donation],
    }),

    // ✅ Get single donation
    getSingleDonation: builder.query({
      query: (id: string) => ({
        url: `/donation/${id}`,
        method: "GET",
      }),
    }),

    // ✅ My donations (logged-in user)
    getMyDonations: builder.query({
      query: () => ({
        url: "/donation/my",
        method: "GET",
      }),
      providesTags: [tagTypes.donation],
    }),

    // ⚠️ Update donation status (admin/webhook/manual)
    updateDonationStatus: builder.mutation({
      query: (data) => ({
        url: "/donation/status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.donation],
    }),

  }),
});

export const {
  useCreateDonationMutation,
  useGetDonationsQuery,
  useGetSingleDonationQuery,
  useGetMyDonationsQuery,
  useUpdateDonationStatusMutation,
} = donationApi;