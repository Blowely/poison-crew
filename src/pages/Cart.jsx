import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined, LoadingOutlined, RightOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cartItems = useAppSelector((state) => state.cart.items);

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Layout >
            <div className="content-block-header">
              <LeftOutlined onClick={() => navigate(`/products/view?productId=${cartItems[0]._id}`)} />
              Оформление заказа <div /></div>
            <div className="content-block">

                <div className="cart-item address">
                    Необходимо заполнить адрес доставки <RightOutlined />
                </div>
                {cartItems.map((el, i) => {
                    return <div key={i} className="cart-item">
                      <div className="cart-product-info">
                        <img src={el?.images[0]} style={{width: '100px'}} alt=""/>
                        <div>
                          <div style={{fontSize: '16px'}}>{el.title}</div>
                          <div>размер: {el.size}</div>
                        </div>
                        <div>
                          <div style={{fontWeight: '500'}}>₽{el.price}</div>
                        </div>
                      </div>

                    </div>
                })}
            </div>

        </Layout>
    );
}
export default Cart;
