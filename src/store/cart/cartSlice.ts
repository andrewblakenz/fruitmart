import { createSlice } from "@reduxjs/toolkit";

import CartProduct from "../../types/CartProduct";

export interface CartState {
  cart: CartProduct[];
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] } as CartState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload.product.id);
      if (cartItem) {
        if (cartItem.inCart !== undefined) {
          if (cartItem.inCart + action.payload.quantity <= cartItem.baseStock) {
            cartItem.inCart = cartItem.inCart + action.payload.quantity;
          }
        }
      } else {
        if (action.payload.quantity <= action.payload.product.baseStock) {
          state.cart.push({ ...action.payload.product, inCart: action.payload.quantity });
        }
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cart = [...state.cart.splice(itemIndex, 1)];
      }
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.inCart !== undefined) {
        item.inCart++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.inCart !== undefined && item.inCart >= 1) {
        item.inCart--;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
