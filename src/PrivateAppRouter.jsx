import React, { Suspense } from "react";
import { AppLoading } from "./common/AppLoading";
import {Navigate, Route, Routes, useSearchParams} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import VisitedProducts from "./pages/VisitedProducts";
import Favorites from "./pages/Favorites";
import Information from "./pages/Information";
import Payment from "./pages/Payment";
import Order from "./pages/Order";
import Trace from "./pages/Trace";
import CategoriesTree from "./components/CategoriesTree/CategoriesTree";
import SBPayment from "./pages/SBPayment/SBPayment";

export function PrivateAppRouter({
  searchValue,
  setSearchValue,
  cartItems,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {
  const gendersList = ['women', 'men', 'kid'];

  const genderParamUrl = window.location.href.split("/")[3];
  const genderParam = genderParamUrl.split('-')[0];

  const gender =  gendersList.includes(genderParam) ? genderParam : localStorage.getItem("gender") || "men";
  localStorage.setItem("gender", gender);

  return (
    <Suspense fallback={<AppLoading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/men-products" />} replace />
        <Route path="/products" element={<Navigate to="/men-products" />} replace />
        <Route
          path={`/men-products`}
          element={
            <Home
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path={`/women-products`}
          element={
            <Home
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route path={`/products/*`} element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/*" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/trace" element={<Trace />} />
        <Route path="/visited" element={<VisitedProducts />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/sbp" element={<SBPayment />} />
        <Route path={`/men-categories/`} element={<CategoriesTree />} />
        <Route path={`/women-categories/`} element={<CategoriesTree />} />
        <Route path="/info" element={<Information />} />
        {/*<Route path="*" element={<Navigate to={`/${gender}-products`} />} replace />*/}
      </Routes>
    </Suspense>
  );
}
