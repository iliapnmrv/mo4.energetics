import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "store/fetchBaseQuery";

export type ICatalogs =
  | "persons"
  | "statuses"
  | "places"
  | "types"
  | "repairsTypes"
  | "repairsDecisions";

export type ICatalog = {
  name: string;
  id: number;
};

export type IAllCatalogsResponse = {
  persons: ICatalog[];
  statuses: ICatalog[];
  types: ICatalog[];
  places: ICatalog[];
  repairsTypes: ICatalog[];
  repairsDecisions: ICatalog[];
};

export const catalogApi = createApi({
  reducerPath: "api/catalog",
  tagTypes: ["Catalog", "AllCatalogs", "Available"],
  baseQuery,
  endpoints: (builder) => ({
    getCatalogs: builder.query<IAllCatalogsResponse, void>({
      query: () => `catalog`,
      providesTags: ["AllCatalogs"],
    }),
    getCatalog: builder.query<ICatalog[], ICatalogs>({
      query: (catalog) => `catalog/${catalog}`,
      providesTags: ["Catalog"],
    }),
    updateCatalog: builder.mutation<
      ICatalog,
      ICatalog & { catalog: ICatalogs }
    >({
      query: ({ id, catalog, ...body }) => ({
        url: `catalog/${catalog}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Catalog", "AllCatalogs"],
    }),
    createCatalog: builder.mutation<
      ICatalog,
      { catalog: ICatalogs; name: string }
    >({
      query: ({ catalog, ...body }) => ({
        url: `catalog/${catalog}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Catalog", "AllCatalogs"],
    }),
    deleteCatalog: builder.mutation<any, { catalog: ICatalogs; id: number }>({
      query: ({ id, catalog }) => ({
        url: `catalog/${catalog}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Catalog", "AllCatalogs"],
    }),
  }),
});

export const {
  useCreateCatalogMutation,
  useDeleteCatalogMutation,
  useGetCatalogsQuery,
  useGetCatalogQuery,
  useUpdateCatalogMutation,
} = catalogApi;
