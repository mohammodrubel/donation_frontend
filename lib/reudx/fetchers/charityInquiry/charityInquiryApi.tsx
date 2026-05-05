import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../Tagtypes";

export interface InquiryListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending" | "responded" | "resolved" | "archived";
  charityId?: string;
}

export interface CreateInquiryPayload {
  charityId: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const buildQuery = (params?: InquiryListParams) => {
  if (!params) return "";
  const sp = new URLSearchParams();
  if (params.page) sp.set("page", String(params.page));
  if (params.limit) sp.set("limit", String(params.limit));
  if (params.search) sp.set("search", params.search);
  if (params.status) sp.set("status", params.status);
  if (params.charityId) sp.set("charityId", params.charityId);
  const q = sp.toString();
  return q ? `?${q}` : "";
};

export const charityInquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInquiry: builder.mutation<any, CreateInquiryPayload>({
      query: (data) => ({
        url: "/charity-inquiry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.charityInquiry],
    }),

    getInquiries: builder.query<any, InquiryListParams | undefined>({
      query: (params) => ({
        url: `/charity-inquiry${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.charityInquiry],
    }),

    getSingleInquiry: builder.query<any, string>({
      query: (id) => ({
        url: `/charity-inquiry/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.charityInquiry],
    }),

    updateInquiryStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/charity-inquiry/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tagTypes.charityInquiry],
    }),

    deleteInquiry: builder.mutation<any, string>({
      query: (id) => ({
        url: `/charity-inquiry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.charityInquiry],
    }),
  }),
});

export const {
  useCreateInquiryMutation,
  useGetInquiriesQuery,
  useGetSingleInquiryQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
} = charityInquiryApi;
