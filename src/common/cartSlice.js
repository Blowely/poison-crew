import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addToCart(state, { payload }) {
      state.items = [...state.items, payload];
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter(el => el._id !== payload.id);
    }
  }
})

export const {addToCart, removeFromCart} = cartSlice.actions;