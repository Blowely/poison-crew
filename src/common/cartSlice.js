import {createSlice} from "@reduxjs/toolkit";

const cacheItem = (item) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const isInCart = cachedItems.findIndex(el => el.spuId === item.spuId);

  if (isInCart < 0) {
    localStorage.setItem("cartItems", JSON.stringify([...cachedItems, item]));
  }
}

const unCacheItem = (item) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const isInCart = cachedItems.findIndex(el => el.spuId === item.spuId);

  if (isInCart >= 0) {
    const updatedItems = cachedItems.filter((el) => el?.spuId !== item.spuId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  }
}

const getOptions = () => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return {
    name: 'cart',
    initialState: {items: cachedItems},
    reducers: {
      addToCart(state, { payload }) {
        cacheItem(payload)
        state.items = [...state.items, payload];
      },
      removeFromCart(state, { payload }) {
        unCacheItem(payload)
        state.items = state.items.filter(el => el._id !== payload._id);
      },
      clearCart(state) {
        state.items = [];
      }
    }
  }
}

export const cartSlice = createSlice(getOptions())

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;