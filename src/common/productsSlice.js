import {createSlice} from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
      personal: [],
      popular: [],
      isVisibleSidebar: false,
  },
  reducers: {
    addProducts(state, {payload}) {
      return {...state, ...payload}
    },
    isVisibleSidebar(state, {payload}) {
      return state.isVisibleSidebar;
    },
    showSidebar(state, {payload}) {
      state.isVisibleSidebar = true;
    },
    hideSidebar(state, {payload}) {
      state.isVisibleSidebar = false;
    },
  }
})

export const {addProducts, isVisibleSidebar, hideSidebar, showSidebar} = productsSlice.actions;