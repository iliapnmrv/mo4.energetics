import { createApi } from "@reduxjs/toolkit/query/react";
import { IItem } from "pages";
import { baseQuery } from "store/fetchBaseQuery";

export const itemApi = createApi({
  reducerPath: "api/item",
  tagTypes: ["Items"],
  baseQuery,
  endpoints: (builder) => ({
    getItems: builder.query<IItem[], Record<string, any>>({
      query: (params) => ({ url: `items`, params }),
      providesTags: ["Items"],
    }),
  }),
});

export const { useGetItemsQuery } = itemApi;
