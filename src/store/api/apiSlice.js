import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
    }),
    getWallet: builder.query({
      query: () => "/wallet",
    }),
    getTransactions: builder.query({
      query: () => "/transactions",
    }),
  }),
});

export const { useGetUserQuery, useGetWalletQuery, useGetTransactionsQuery } =
  apiSlice;
