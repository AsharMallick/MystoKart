import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import { Response } from "../interfaces/product.interface";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Response,
      {
        page?: number;
        search?: string;
        category?: string;
        gt: number | null;
        lt: number | null;
      }
    >({
      query: ({ page = 1, category = "", search = "", gt, lt }) => ({
        url: `/products?page=${parseInt(
          String(page)
        )}&category=${category}&search=${search}&lt=${lt}&gt=${gt}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getProduct: builder.query<Response, { id?: string }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getFeaturedProducts: builder.query<Response, void>({
      query: () => ({
        url: "/featuredProducts",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
} = productsApi;
