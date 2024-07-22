import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  tagTypes: ["Collection"],
  baseQuery: baseQuery('https://api.re-poizon.ru/api'),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: (params) => customUrlBuilder("/collections", params),
      ...collectionQueryProps("Collection"),
    }),
  }),
});

export const { useGetCollectionsQuery } = collectionsApi;
