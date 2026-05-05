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

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, PaginationParams | undefined>({
      query: (params) => ({
        url: `/users${buildQuery(params)}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getSingleUser: builder.query<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation,
} = userApi;
