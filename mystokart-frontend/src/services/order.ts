import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/order.interface";
import { Product } from "../interfaces/product.interface";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
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
      }
    >({
      query: ({ orderItems, shippingDetails, totalPrice, orderType }) => ({
        url: "/order/new",
        method: "POST",
        credentials: "include",
        body: { orderItems, shippingDetails, totalPrice, orderType },
      }),
    }),
  }),
});

export const { useNewOrderMutation } = orderApi;
