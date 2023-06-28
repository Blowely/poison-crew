import {createSlice} from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    phone: '',
    addresses: []
  },
  reducers: {
    addPhone(state, {payload}) {
      state.phone = payload.phone;
    },
    addAddress(state, {payload}) {
      state.addresses = [...state.addresses, payload];
    },
    setAddress(state, {payload}) {
      state.addresses = [payload];
    },
    removeAddress(state, { payload }) {
      state.addresses = state.addresses.filter(el => el.id !== payload.id);
    },
    cleanAddresses(state) {
      state.addresses = [];
    },
  }
})

export const {addPhone, addAddress, setAddress, removeAddress, cleanAddresses} = accountSlice.actions;