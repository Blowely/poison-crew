import {productsApi} from "./products.store";
import {combineReducers, configureStore as createStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {accountsApi} from "./accounts.store";

export const reducers = {
  [productsApi.reducerPath]: productsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer
};

const reducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'PRODUCTION',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
      .concat(productsApi.middleware)
      .concat(accountsApi.middleware)
  });

  return store;
}

export const store = configureStore();

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
