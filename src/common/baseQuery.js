import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseQuery = (baseUrl) => fetchBaseQuery({
  baseUrl
})