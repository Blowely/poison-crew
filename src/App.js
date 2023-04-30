import React from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";

import Home from "./pages/Home";
import AppContext from "./context";
import Favorites from "./pages/Favorites";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer";

import "./index.scss";
import "./nova-ds.scss";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get(
                "https://643062f7b289b1dec4c76583.mockapi.io/cart"
            );
            const favoritesResponse = await axios.get(
                "https://643806eac1565cdd4d6435e6.mockapi.io/favorites"
            );
            const itemsResponse = await axios.get(
                "https://643062f7b289b1dec4c76583.mockapi.io/items"
            );

            setIsLoading(false);

            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }
        fetchData();
    }, []);

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

    return (
        <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded,  onAddToFavorite, setCartOpened, setCartItems }}>
            <div className="App clear">
                {cartOpened && (
                    <Drawer
                        items={cartItems}
                        onClose={() => setCartOpened(false)}
                        onRemove={onRemoveItem}
                    />
                )}
                <Header onClickCart={() => setCartOpened(true)} />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
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
                        path="/favorites"
                        element={<Favorites />}
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}
export default App;
