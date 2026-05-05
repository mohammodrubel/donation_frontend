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

export const charityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // CREATE CHARITY
    createCharity: builder.mutation({
      query: (data) => ({
        url: "/charity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.charity],
    }),

    // GET ALL CHARITIES (with pagination + search)
    getCharities: builder.query<any, PaginationParams | void>({
      query: (params) => ({
        url: `/charity${buildQuery(params || undefined)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.charity],
    }),

    // GET SINGLE CHARITY
    getSingleCharity: builder.query({
      query: (id) => ({
        url: `/charity/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.charity],
    }),

    // UPDATE CHARITY
    updateCharity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/charity/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.charity],
    }),

    // DELETE CHARITY
    deleteCharity: builder.mutation({
      query: (id) => ({
        url: `/charity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.charity],
    }),

  }),
});

export const {
  useCreateCharityMutation,
  useGetCharitiesQuery,
  useGetSingleCharityQuery,
  useUpdateCharityMutation,
  useDeleteCharityMutation,
} = charityApi;
