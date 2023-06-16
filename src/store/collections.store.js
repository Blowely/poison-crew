import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps, customUrlBuilder} from "../common/utils";

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  tagTypes: ['Collection'],
  baseQuery: baseQuery('http://185.164.172.242:3000/api'),
  //baseQuery: baseQuery('http://localhost:3000/api'),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: (params) => customUrlBuilder('/collections', params),
      ...collectionQueryProps('Collection'),
    }),
  })
})

export const {
  useGetCollectionsQuery,
} = collectionsApi;
