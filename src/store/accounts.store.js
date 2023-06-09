import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps, customUrlBuilder} from "../common/utils";

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  tagTypes: ['Account','Sms'],
  baseQuery: baseQuery('http://185.164.172.242:3000/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getCode: builder.query({
      query: (phone) => '',//`/sms?phone=7${phone}`,
      invalidatesTags: (result, error, arg) => [{type: 'Account', id: arg}],
    }),
    addCode: builder.mutation({
      query: ({phone, code}) => ({
        url: '/sms',
        method: 'POST',
        body: {phone, code}
      })
    }),
  })
})

export const {
  useLazyGetCodeQuery,
  useAddCodeMutation,
} = accountsApi;