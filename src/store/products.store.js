import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps, customUrlBuilder} from "../common/utils";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Product'],
  baseQuery: baseQuery('http://77.91.126.217:3000/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => customUrlBuilder('/products', params),
      ...collectionQueryProps('Product'),
    }),
    getProduct: builder.query({
      query: ({productId, token}) => `/products?id=${productId}&token=${token}`,
      invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg}],
    }),
    getCartProducts: builder.query({
      query: (token) => `/products?token${token}`,
      ...collectionQueryProps('Product'),
    }),
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartProductsQuery
} = productsApi;
