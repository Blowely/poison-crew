import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useSearchParams} from "react-router-dom";
import CarouselComponent from "../components/Carousel/Carousel";
import "./product.scss";
import {LoadingOutlined} from "@ant-design/icons";
import AuthModal from "./AuthModal";
import {useAppDispatch, useAppSelector} from "../store";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const [searchParams, setSearchParams] = useSearchParams();

    const productId = searchParams.get('productId');

    const { data: product, isLoading: isLoadingProduct } = useGetProductQuery(productId);

    return (
        <Layout >

                {cartItems.map(el => {
                  return <div className="cart-item">{el.title}</div>
                })}
        </Layout>
    );
}
export default Cart;
