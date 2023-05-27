import {Suspense} from "react";
import {AppLoading} from "./common/AppLoading";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

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
      <Route path="/" element={<Navigate to="products" />} replace />
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
      <Route path="*" element={<Navigate to="products" />} replace />
    </Routes>
  </Suspense>
)