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
      ...collectionQueryProps('Campaign'),
    })
  })
})

export const {
  useGetProductsQuery
} = productsApi;