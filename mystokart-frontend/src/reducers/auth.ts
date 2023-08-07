import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user.interface";
import { authApi } from "../services/auth";

interface AuthState {
  loading: boolean;
  user?: User | null;
  error?: string | null;
  ashar?: string | null;
  message?: string | null;
  isAuthenticated?: boolean | null;
}

const initialState: AuthState = {
  loading: true,
  user: null,
  error: null,
  message: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearAlerts: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        state.message = payload.message;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        state.message = payload.message;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload?.data.message;
        state.user = null;
        state.message = null;
        state.isAuthenticated = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload?.data.message;
        state.user = null;
        state.message = null;
        state.isAuthenticated = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loadUser.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        state.message = null;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loadUser.matchRejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload?.data.message;
        state.user = null;
        state.message = null;
        state.isAuthenticated = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = payload.message;
        state.isAuthenticated = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchRejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload?.data.message;
        state.user = null;
        state.message = null;
        state.isAuthenticated = true;
      }
    );
  },
});

export default authSlice.reducer;
