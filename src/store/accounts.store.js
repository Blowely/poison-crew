import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  tagTypes: ['Account','Sms'],
  baseQuery: baseQuery('http://185.164.172.242:3000/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getCode: builder.query({
      query: (phone) => `/sms?phone=7${phone}`,
      invalidatesTags: (result, error, arg) => [{type: 'Account', id: arg}],
    }),
    addCode: builder.mutation({
      query: ({phone, code}) => ({
        url: '/sms',
        method: 'POST',
        body: JSON.stringify({phone, code})
      })
    }),
    addAccount: builder.mutation({
      query: (body) => ({
        url: '/accounts',
        method: 'POST',
        body: JSON.stringify(body)
      })
    }),
    addAddress: builder.mutation({
      query: ({phone, code}) => ({
        url: '/address',
        method: 'POST',
        body: JSON.stringify({phone, code})
      })
    }),
  })
})

export const {
  useLazyGetCodeQuery,
  useAddCodeMutation,
  useAddAccountMutation,
  useAddAddressMutation,
} = accountsApi;