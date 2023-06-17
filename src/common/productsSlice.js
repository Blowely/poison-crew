import {createSlice} from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
      personal: [],
      popular: [],
  },
  reducers: {
    addProducts(state, {payload}) {
      console.log('payload',payload)
      console.log('state', state)
      let newState = {
        ...state,
        payload
      };
      //console.log('newState =', newState);
      /*return {
        ...state,
        [payload?.collName]: [...state[payload?.collName], ...payload?.items]
      };*/


      return {...state, ...payload}
    },
  }
})

export const {addProducts} = productsSlice.actions;