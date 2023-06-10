import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined, LoadingOutlined, RightOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Layout >
            <div className="content-block-header"><LeftOutlined />Оформление заказа <div /></div>
            <div className="content-block">

                <div className="cart-item address">
                    Необходимо заполнить адрес доставки <RightOutlined />
                </div>
                {cartItems.map(el => {
                    return <div className="cart-item">{el.title}</div>
                })}
            </div>

        </Layout>
    );
}
export default Cart;
