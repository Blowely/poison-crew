import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "../common/baseQuery";
import {collectionQueryProps} from "../common/utils";

export const boxBerryApi = createApi({
  reducerPath: 'boxBerryApi',
  tagTypes: ['Office'],
  baseQuery: baseQuery('https://api.boxberry.ru/json.php'),
  endpoints: (builder) => ({
    getOffices: builder.query({
      query: () => `?token=333d8a0ba433f89a5b8b7f313b654f9c&method=ListPoints&prepaid=1`,
      ...collectionQueryProps('Office'),
    }),
  })
})

export const {
  useGetOfficesQuery,
} = boxBerryApi;
