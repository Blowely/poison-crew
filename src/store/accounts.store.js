import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  tagTypes: ['Account','Sms'],
  baseQuery: baseQuery('http://185.164.172.242:3000/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getCode: builder.query({
      query: ({phone, userAgent}) => `/sms?phone=7${phone}?userAgent=${userAgent}`,
      invalidatesTags: (result, error, arg) => [{type: 'Account', id: arg}],
    }),
    addCode: builder.mutation({
      query: ({phone, code}) => ({
        url: '/sms',
        method: 'POST',
        body: JSON.stringify({phone, code})
      })
    }),
    addAddress: builder.mutation({
      query: ({accPhone, address}) => ({
        url: `/address?accPhone=${accPhone}`,
        method: 'POST',
        body: JSON.stringify({address})
      })
    }),
  })
})

export const {
  useLazyGetCodeQuery,
  useAddCodeMutation,
  useAddAddressMutation,
} = accountsApi;