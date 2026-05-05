import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { tagTypesList } from "../Tagtypes";
import { DEFAULT_LANG } from "@/lib/i18n/config";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.token;
    const lang = state.lang?.lang ?? DEFAULT_LANG;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("accept-language", lang);

    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});