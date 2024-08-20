import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  tagTypes: ["Brand"],
  baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  //baseQuery: baseQuery("http://localhost:3001/api"),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (params) => customUrlBuilder("/productsV4", params),
      ...collectionQueryProps("Brand"),
    }),

  }),
});

export const {
  useGetBrandsQuery,
} = brandsApi;
