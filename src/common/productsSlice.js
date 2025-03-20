import {createSlice} from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
      personal: [],
      popular: [],
  },
  reducers: {
      addProducts(state, { payload }) {
          Object.keys(payload).forEach((key) => {
              state[key] = [...(state[key] || []), ...payload[key]]; // Создаём новый массив
          });
      },
  }
})

export const {addProducts} = productsSlice.actions;