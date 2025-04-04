import {createSlice} from "@reduxjs/toolkit";

const cacheItem = (item) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const isInCart = cachedItems.findIndex(el => el?.cartId === item?.cartId);

  if (isInCart < 0) {
    localStorage.setItem("cartItems", JSON.stringify([...cachedItems, {
      ...item,
      count: 1
    }]));
  }

  if (isInCart >= 0) {
    cachedItems[isInCart].count = cachedItems[isInCart]?.count ? cachedItems[isInCart].count + 1 : 1;
    localStorage.setItem("cartItems", JSON.stringify(cachedItems));
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

const clearItems = (selectedIds) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const updatedItems = selectedIds?.length ? cachedItems.filter(el => !selectedIds?.includes(el.spuId)) : []
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));
}

const getOptions = () => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return {
    name: 'cart',
    initialState: {items: cachedItems},
    reducers: {
      addToCart(state, { payload }) {
        cacheItem(payload)
        console.log('payload',payload)
        const isInCart = state.items.findIndex((el) => el?.cartId === payload.cartId);

        if (isInCart < 0) {
          state.items =  [...state.items, {
            ...payload,
            count: 1
          }];
        }

        if (isInCart >= 0) {
          state.items[isInCart].count = state.items[isInCart]?.count ? state.items[isInCart].count + 1 : 1;
        }
      },
      removeFromCart(state, { payload }) {
        unCacheItem(payload)
        state.items = state.items.filter(el => el.cartId !== payload.cartId);
      },
      clearCart(state, { payload }) {
        clearItems(payload)
        state.items = payload?.length ? state.items.filter(el => !payload?.includes(el.spuId)) : [];
      }
    }
  }
}

export const cartSlice = createSlice(getOptions())

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;