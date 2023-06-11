import React, {useEffect, useState} from "react";
import {Button, Layout, Modal} from "antd";
import {useGetProductQuery} from "../store/products.store";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./cart.scss";
import {LeftOutlined, LoadingOutlined, RightOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../store";
import BagIcon from "../assets/svg/bag-icon";

function Cart({onAddToFavorite, onAddToCart, isLoading}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');

    const cartItems = useAppSelector((state) => state.cart.items);

    const onGoBackClick = () => {
      return  from ? navigate('/products') : navigate(`/products/view?productId=${cartItems[0]?._id}`);
    }

    return (
        <Layout >
            <div className="content-block-header">
              <LeftOutlined onClick={onGoBackClick} />
              Оформление заказа <div /></div>
            <div className="content-block">

                <div className="cart-item address">
                    Необходимо заполнить адрес доставки <RightOutlined />
                </div>
                {cartItems.map((el, i) => {
                    return <div key={i} className="cart-item">
                      <div className="cart-product-info">
                        <div style={{display: 'flex', gap: '7px'}}>
                          <img src={el?.images[0]} style={{width: '100px'}} alt=""/>
                          <div>
                            <div style={{fontSize: '16px'}}>{el.title}</div>
                            <div>размер: {el.size}</div>
                          </div>
                        </div>


                        <div>
                          <div style={{fontWeight: '500'}}>₽{el.price}</div>
                        </div>
                      </div>

                    </div>
                })}
            </div>
            <footer>
              <div onClick={() => navigate('/products')}><BagIcon/></div>
              <ShoppingCartOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/cart?from=products')}/>
              <UserOutlined style={{ fontSize: '30px'}} onClick={() => navigate('/products')} />
            </footer>
        </Layout>
    );
}
export default Cart;
