import {createSlice} from "@reduxjs/toolkit";
import discountedPrice from "../components/DiscountedPrice/DiscountedPrice";

const cacheItem = (item) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const isInCart = cachedItems.findIndex(el => el?.skuId === item?.skuId);

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

const decreaseCachedItem = (item) => {
  let cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const cachedCartIndex = cachedItems.findIndex(el => el?.skuId === item?.skuId);

  const removeFromCachedCart = () => {
    cachedItems = cachedItems.filter(el => el.skuId !== item.skuId);
  }

  cachedItems[cachedCartIndex].count = cachedItems[cachedCartIndex]?.count > 1
      ? cachedItems[cachedCartIndex]?.count - 1
      : removeFromCachedCart();

  localStorage.setItem("cartItems", JSON.stringify(cachedItems));
}

const unCacheItem = (item) => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const isInCart = cachedItems.findIndex(el => el?.skuId === item?.skuId);

  if (isInCart >= 0) {
    const updatedItems = cachedItems.filter((el) => el?.skuId !== item.skuId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  }
}

const clearItems = (updatedItems) => {
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));
}

const applyCacheDiscount = (updatedItems) => {
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));
}

const getRefreshedCartItems = (items) => {
  return items.map((item) => ({...item, discountedPrice: null, discount: null}))
}

const getOptions = () => {
  const cachedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return {
    name: 'cart',
    initialState: {items: cachedItems},
    reducers: {
      addToCart(state, { payload }) {
        cacheItem(payload)
        const isInCart = state.items.findIndex((el) => el?.skuId === payload.skuId);

        if (isInCart < 0) {
          state.items = [...state.items, {
            ...payload,
            count: 1
          }];
        }

        if (isInCart >= 0) {
          state.items[isInCart].count = state.items[isInCart]?.count ? state.items[isInCart].count + 1 : 1;
        }
      },
      decreaseCartItem(state, { payload }) {
        const cartIndex = state.items.findIndex((el) => el?.skuId === payload.skuId);
        decreaseCachedItem(payload)

        const removeFromCart = () => {
          state.items = state.items.filter(el => el.skuId !== payload.skuId);
        }

        if (cartIndex >= 0) {
          state.items[cartIndex].count = state.items[cartIndex]?.count > 1 ? state.items[cartIndex]?.count - 1 : removeFromCart()
        }
      },
      removeFromCart(state, { payload }) {
        unCacheItem(payload)
        state.items = state.items.filter(el => el.skuId !== payload.skuId);
      },
      clearCart(state, { payload }) {
        let updatedItems = payload?.length ? state.items.filter(el => !payload?.includes(el.skuId)) : [];

        state.items = getRefreshedCartItems(updatedItems);// clear discounts
        clearItems(updatedItems)
      },
      applyCartDiscount(state, {payload}) {
        const discount = payload?.discount || "";
        if (!discount || discount?.length < 2) return;

        const updatedItems = state.items.map(el => {
          if (!el?.price) return el;

          const discountedPrice = Math.trunc(el.price * (1 -`${0}.${discount}`))
          return {...el, discountedPrice, discount: discount}
        });

        state.items = updatedItems;
        applyCacheDiscount(updatedItems)
      },
    }
  }
}

export const cartSlice = createSlice(getOptions())

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCartItem,
  applyCartDiscount
} = cartSlice.actions;