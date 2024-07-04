import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/baseQuery";
import { API_URL } from "../bootstrap";

export const accountsApi = createApi({
  reducerPath: "accountsApi",
  tagTypes: ["Account", "Sms"],
  baseQuery: baseQuery("https://api.re-poizon.ru/api"),
  //baseQuery: baseQuery('http://localhost:3001/api'),
  endpoints: (builder) => ({
    getCode: builder.query({
      query: ({ phone, userAgent }) =>
        `/sms?phone=7${phone}&userAgent=${userAgent}`,
      invalidatesTags: (result, error, arg) => [{ type: "Account", id: arg }],
    }),
    addCode: builder.mutation({
      query: ({ phone, code }) => ({
        url: "/sms",
        method: "POST",
        body: JSON.stringify({ phone, code }),
      }),
    }),
    getAccount: builder.query({
      query: (token) => `/accounts?token=${token}`,
      invalidatesTags: (result, error, arg) => [{ type: "Account", id: arg }],
    }),
    addAddress: builder.mutation({
      query: ({ token, address }) => ({
        url: `/accounts?token=${token}`,
        method: "POST",
        body: JSON.stringify({ address }),
      }),
    }),
    updateActiveAddress: builder.mutation({
      query: ({ token, addressId }) => ({
        url: `/accounts?token=${token}&methodType=patchAccAddr`,
        method: "POST",
        body: JSON.stringify({ addressId }),
      }),
    }),
    deleteAddress: builder.mutation({
      query: ({ token, addressId }) => ({
        url: `/deleteAddress?token=${token}&methodType=patchAccAddr`,
        method: "POST",
        body: JSON.stringify({ addressId }),
      }),
    }),
  }),
});

export const {
  useLazyGetCodeQuery,
  useGetAccountQuery,
  useAddCodeMutation,
  useAddAddressMutation,
  useUpdateActiveAddressMutation,
  useDeleteAddressMutation,
} = accountsApi;
