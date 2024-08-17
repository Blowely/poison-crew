import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  //baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  baseQuery: baseQuery("http://localhost:3001/api"),
  endpoints: (builder) => ({
    parseProduct: builder.query({
      query: ({ spuId, token }) =>
        `/productsV4?spuId=${spuId}&token=${token}&update=true`,
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getProducts: builder.query({
      query: (params) => customUrlBuilder("/productsV4", params),
      ...collectionQueryProps("Product"),
    }),
    getProduct: builder.query({
      query: ({ spuId, token }) =>
        `/productsV4?spuId=${spuId}&token=${token}`,
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getCartProducts: builder.query({
      query: (token) => `/productsV4?token${token}`,
      ...collectionQueryProps("Product"),
    }),
  }),
});

export const {
  useParseProductQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartProductsQuery,
} = productsApi;
