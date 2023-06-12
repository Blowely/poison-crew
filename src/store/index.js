import {productsApi} from "./products.store";
import {combineReducers, configureStore as createStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {accountsApi} from "./accounts.store";
import {cartSlice} from "../common/cartSlice";
import {accountSlice} from "../common/accountSlice";
import {ordersApi} from "./orders.store";

export const reducers = {
  [productsApi.reducerPath]: productsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
};

const reducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'PRODUCTION',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
      .concat(productsApi.middleware)
      .concat(accountsApi.middleware)
      .concat(ordersApi.middleware)
  });

  return store;
}

export const store = configureStore();

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
