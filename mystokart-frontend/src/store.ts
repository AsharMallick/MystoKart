import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";

import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";
import { productsApi } from "./services/product";
import { orderApi } from "./services/order";
import { cartReducer } from "./reducers/cart";
import orderReducer from "./reducers/order";
export const server = `http://localhost:4000/api/v1`;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cartState: cartReducer,
    product: productReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(orderApi.middleware),
});
