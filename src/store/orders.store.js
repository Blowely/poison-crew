import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Order'],
  baseQuery: baseQuery('https://api.re-poizon.ru/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (clientId) => `/orders?clientId=${clientId}`,
      invalidatesTags: (result, error, arg) => [{type: 'Order', id: arg}],
    }),
    addOrder: builder.mutation({
      query: ({clientId, products, address}) => ({
        url: '/orders',
        method: 'POST',
        body: JSON.stringify({clientId, products, address})
      })
    }),
  })
})

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
} = ordersApi;
