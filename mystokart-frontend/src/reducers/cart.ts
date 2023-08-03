import { createReducer } from "@reduxjs/toolkit";
import { Cart } from "../interfaces/cart.interface";

const initialState = {
  cart: localStorage.getItem("cart")
    ? (JSON.parse(localStorage.getItem("cart") as string) as Cart)
    : ({ products: [], totalPrice: 0 } as Cart),
};

export const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    const itemExists = state.cart.products?.find((item) => {
      return item._id === action.payload._id;
    });

    if (itemExists) {
      state.cart.products?.forEach((item) => {
        if (item._id === action.payload._id) {
          if (item.qty! < Number(item.stock)) {
            item.qty! += 1;
          }
        }
      });
    } else {
      state.cart.products?.push(action.payload);
    }
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  REMOVE_FROM_CART: (state, action) => {
    state.cart.products = state.cart.products?.filter(
      (item) => item._id !== action.payload._id
    );
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  DECREASE_QUANTITY: (state, action) => {
    state.cart.products?.forEach((item) => {
      if (item._id === action.payload._id) {
        if (item.qty == 1) {
          state.cart.products = state.cart.products?.filter(
            (item) => item._id !== action.payload._id
          );
          localStorage.setItem("cart", JSON.stringify(state.cart));
          return;
        }
        item.qty! -= 1;
      }
    });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
  CLEAR_CART: (state, action) => {
    state.cart.products = [];
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.removeItem("cart");
  },

  CALCULATE_SUBTOTAL: (state, _) => {
    state.cart.totalPrice = state.cart.products
      ?.filter((product) => product.price && product.qty)
      .reduce((acc, product) => acc + product.price * product.qty!, 0);
  },
});
