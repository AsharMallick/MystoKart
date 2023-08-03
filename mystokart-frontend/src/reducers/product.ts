import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user.interface";
import { productsApi } from "../services/product";
import { Product } from "../interfaces/product.interface";

interface ProductState {
  loading: boolean;
  products?: Product[] | null;
  product?: Product | null;
  error?: string | null;
  message?: string | null;
  featuredProducts?: Product[] | null;
}

const initialState: ProductState = {
  loading: true,
  products: [],
  product: null,
  error: null,
  message: null,
  featuredProducts: [],
};

export const productsSlice = createSlice({
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
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.products = payload.products;
        state.error = null;
        state.message = payload.message;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getProduct.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.product = payload.product;
        state.error = null;
        state.message = payload.message;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getFeaturedProducts.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.featuredProducts = payload.products;
        state.error = null;
        state.message = payload.message;
      }
    );
  },
});

export default productsSlice.reducer;
