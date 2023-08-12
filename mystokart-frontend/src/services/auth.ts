import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import { Response } from "../interfaces/user.interface";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<Response, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        credentials: "include",
      }),
    }),
    register: builder.mutation<
      Response,
      { username: string; email: string; password: string; avatar: string }
    >({
      query: ({ email, password, username, avatar }) => ({
        url: "/register",
        method: "POST",
        body: { email, password, name: username, avatar },
        credentials: "include",
      }),
    }),
    loadUser: builder.query<Response, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.mutation<Response, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
