import React from "react";

import axios from "axios";

import Drawer from "./components/Drawer";

import "./index.scss";
import "./nova-ds.scss";
import {Layout} from "antd";
import {ErrorBoundary} from "react-error-boundary";
import ErrorHandler from "./common/ErrorHandler";
import {PrivateAppRouter} from "./PrivateAppRouter";
import moment from "moment";
import 'moment/locale/ru';
import Sidebar from "./components/Sidebar/Sidebar";
import {useAppSelector} from "./store";

moment.locale('ru');

const Root = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const isVisibleCategories = useAppSelector((state) => state.products.isVisibleSidebar);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://643062f7b289b1dec4c76583.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://643062f7b289b1dec4c76583.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Error with products in cart");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://643806eac1565cdd4d6435e6.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          "https://643806eac1565cdd4d6435e6.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Error, can`t add to favorites");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://643062f7b289b1dec4c76583.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // setCartItems([...cartItems, obj]);
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const ErrorFallback = () => {
    return (
      <Layout>
        Упс, что-то пошло не так
      </Layout>
    )
  }

  return (
      <Layout className="App">
        {cartOpened && (
          <Drawer
            items={[]}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        {isVisibleCategories && (
            <Sidebar
                visible={isVisibleCategories}
                setOffset={() => {}}
                setLoading={() => {}}
            />
        )}

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ErrorHandler>
            <PrivateAppRouter
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          </ErrorHandler>
        </ErrorBoundary>
      </Layout>
  );
}
export default Root;
