import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps, customUrlBuilder} from "../common/utils";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Product'],
  baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => customUrlBuilder('/products', params),
      ...collectionQueryProps('Product'),
    }),
    getProduct: builder.query({
      query: (productId) => `/products?id=${productId}`,
      invalidatesTags: (result, error, arg) => [{type: 'Product', id: arg}],
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery
} = productsApi;