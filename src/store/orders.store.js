import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { API_URL } from "../bootstrap";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["Order"],
  baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  //baseQuery: baseQuery('http://localhost:3001/api'),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (clientId) => `/orders?clientId=${clientId}`,
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    getOrder: builder.query({
      query: (orderId, clientId) =>
        `/orders?id=${orderId}&clientId=${clientId}`,
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    addOrder: builder.mutation({
      query: ({ clientId, products, address, promo }) => ({
        url: "/orders",
        method: "POST",
        body: JSON.stringify({ clientId, products, address, promo }),
      }),
    }),
    updateStatus: builder.mutation({
      query: ({ clientId, orderId, status }) => ({
        url: "/updateStatus",
        method: "POST",
        body: JSON.stringify({ clientId, orderId, status }),
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateStatusMutation,
} = ordersApi;
