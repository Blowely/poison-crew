import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps} from "../common/utils";

export const cdekApi = createApi({
  reducerPath: 'cdekApi',
  tagTypes: ['Office'],
  baseQuery: baseQuery('https://api.edu.cdek.ru/v2'),
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: () => ({
        url: '/oauth/token?grant_type=client_credentials&' +
            'client_id=client_credentials' +
            '&client_secret=client_credentials',
        method: 'POST',
        contentType: 'x-www-form-urlencoded'
      })
    }),
    getOffices: builder.query({
      query: () => `/deliverypoints?type=PVZ`,
      ...collectionQueryProps('Office'),
    }),
  })
})

export const {
  useGetTokenMutation,
  useGetOfficesQuery,
} = cdekApi;
