import { productsApi } from "./products.store";
import {
  combineReducers,
  configureStore as createStore,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { accountsApi } from "./accounts.store";
import { cartSlice } from "../common/cartSlice";
import { accountSlice } from "../common/accountSlice";
import { ordersApi } from "./orders.store";
import { collectionsApi } from "./collections.store";
import { productsSlice } from "../common/productsSlice";
import { cdekApi } from "./cdek.store";
import { boxBerryApi } from "./boxBerry.store";
import { categoriesApi } from "./categories.store";
import { brandsApi } from "./brands.store";

export const reducers = {
  [productsApi.reducerPath]: productsApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [collectionsApi.reducerPath]: collectionsApi.reducer,
  [boxBerryApi.reducerPath]: boxBerryApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [brandsApi.reducerPath]: brandsApi.reducer,

};

const reducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore({
    reducer,
    devTools: process.env.NODE_ENV !== "PRODUCTION",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(productsApi.middleware)
        .concat(accountsApi.middleware)
        .concat(ordersApi.middleware)
        .concat(collectionsApi.middleware)
        .concat(cdekApi.middleware)
        .concat(boxBerryApi.middleware)
        .concat(categoriesApi.middleware)
        .concat(brandsApi.middleware)
  });

  return store;
}

export const store = configureStore();

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
