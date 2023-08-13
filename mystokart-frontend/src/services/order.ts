import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/order.interface";
import { Product } from "../interfaces/product.interface";
import { server } from "../store";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    newOrder: builder.mutation<
      Response,
      {
        orderItems: Product[];
        shippingDetails: {
          address: string;
          pincode: number;
          email: string;
          country: string;
          state: string;
          city: string;
          phone: string;
        };
        totalPrice: number;
        orderType: string;
        url: string;
      }
    >({
      query: ({ orderItems, shippingDetails, totalPrice, orderType, url }) => ({
        url,
        method: "POST",
        credentials: "include",
        body: { orderItems, shippingDetails, totalPrice, orderType },
      }),
    }),
    getOrder: builder.query<Response, { id: string }>({
      query: ({ id }) => ({
        url: "/order/" + id,
        method: "GET",
        credentials: "include",
      }),
    }),
    getMyOrders: builder.query<Response, void>({
      query: () => ({
        url: "myorders",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useNewOrderMutation, useGetOrderQuery, useGetMyOrdersQuery } =
  orderApi;
