import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../services/product";
import { Product } from "../interfaces/product.interface";
import { Order } from "../interfaces/order.interface";
import { orderApi } from "../services/order";

interface OrderState {
  loading: boolean;
  order?: Order | null;
  orders?: Order[] | null;
  error?: string | null;
  message?: string | null;
}

const initialState: OrderState = {
  loading: true,
  order: null,
  orders: [],
  error: null,
  message: null,
};

export const orderSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    clearAlerts: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApi.endpoints.newOrder.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.order = payload.order;
      }
    );
  },
});

export default orderSlice.reducer;
