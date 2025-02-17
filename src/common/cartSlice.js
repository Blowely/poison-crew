import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addToCart(state, { payload }) {
      state.items = [...state.items, payload];
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter(el => el._id !== payload._id);
    },
    clearCart(state) {
      state.items = [];
    }
  }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;