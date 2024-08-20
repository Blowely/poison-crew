import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Category"],
  baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  //baseQuery: baseQuery("http://localhost:3001/api"),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => customUrlBuilder("/categories", params),
      ...collectionQueryProps("Category"),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
} = categoriesApi;
