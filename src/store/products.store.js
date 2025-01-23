import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  //baseQuery: baseQuery("http://localhost:3001/api"),
  endpoints: (builder) => ({
    parseProduct: builder.query({
      query: ({ spuId, token }) =>
        `/productsV6?spuId=${spuId}&token=${token}&updatePrices=true`,
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getProducts: builder.query({
      query: (params) => customUrlBuilder("/productsV6", params),
      ...collectionQueryProps("Product"),
    }),
    getProduct: builder.query({
      query: ({ spuId, token }) =>
        `/productsV6?spuId=${spuId}&token=${token}`,
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getCartProducts: builder.query({
      query: (token) => `/productsV6?token${token}`,
      ...collectionQueryProps("Product"),
    }),
    getPrice: builder.mutation({
      query: (skuId) => ({
        url: `/productsV6?skuId=${skuId}`,
        method: "GET",
      })
    })
  }),
});

export const {
  useParseProductQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartProductsQuery,
  useGetPriceMutation,
} = productsApi;
