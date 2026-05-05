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

export const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Create donation (Stripe checkout)
    createDonation: builder.mutation({
      query: (data) => ({
        url: "/donation/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.donation],
    }),

    // Get all donations (admin)
    getDonations: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/donation/all${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donation],
    }),

    // Get single donation
    getSingleDonation: builder.query({
      query: (id: string) => ({
        url: `/donation/${id}`,
        method: "GET",
      }),
    }),

    // My donations
    getMyDonations: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/donation/my${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donation],
    }),

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
