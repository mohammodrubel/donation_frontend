import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: "/payment/create-checkout",
        method: "POST",
        body: data,
      }),
    }),

    confirmPayment: builder.mutation({
      query: (session_id: string) => ({
        url: `/payment/confirm?session_id=${session_id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),


    getPayments: builder.query({
      query: () => ({
        url: "/payment",
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),

  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useConfirmPaymentMutation,
  useGetPaymentsQuery,
} = paymentApi;