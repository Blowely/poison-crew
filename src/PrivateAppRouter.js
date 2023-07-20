import {Suspense} from "react";
import {AppLoading} from "./common/AppLoading";
import {Navigate, Route, Routes} from "react-router-dom";
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

export const PrivateAppRouter = ({
                                   products,
                                   searchValue,
                                   setSearchValue,
                                   cartItems,
                                   onChangeSearchInput,
                                   onAddToFavorite,
                                   onAddToCart,
                                   isLoading,
                                 }) => (
  <Suspense fallback={<AppLoading />}>
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} replace />
      <Route path="/products" element={
        <Home
          products={products}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
      } />
        <Route path="/products/*" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/*" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/visited" element={<VisitedProducts />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/info" element={<Information />} />
        <Route path="*" element={<Navigate to="/products" />} replace />
    </Routes>
  </Suspense>
)