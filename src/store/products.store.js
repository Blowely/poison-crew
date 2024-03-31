import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { collectionQueryProps, customUrlBuilder } from "../common/utils";
import { API_URL } from "../bootstrap";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  //baseQuery: baseQuery("http://185.164.172.242:3001/api"),
  baseQuery: baseQuery("http://localhost:3000/api"),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => customUrlBuilder("/productsV3", params),
      ...collectionQueryProps("Product"),
    }),
    getProduct: builder.query({
      query: ({ productId, token }) =>
        `/productsV3?id=${productId}&token=${token}`,
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getCartProducts: builder.query({
      query: (token) => `/productsV3?token${token}`,
      ...collectionQueryProps("Product"),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartProductsQuery,
} = productsApi;
