import {createSlice} from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
      personal: [],
      popular: [],
  },
  reducers: {
    addProducts(state, {payload}) {
      return {...state, ...payload}
    },
  }
})

export const {addProducts} = productsSlice.actions;